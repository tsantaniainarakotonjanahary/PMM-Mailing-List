import path from 'path';
import { app, BrowserWindow, shell, ipcMain, Notification } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import sqlite = require('sqlite3');
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';

const nodemailer = require('nodemailer');

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

const sqlite3 = sqlite.verbose();
const db = new sqlite3.Database('data.db');

db.serialize(() => {
  db.run(
    'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT,servername TEXT, email TEXT , password TEXT)'
  );

  db.run(
    'CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT,nom TEXT)'
  );

  db.run(
    'CREATE TABLE IF NOT EXISTS mails (id INTEGER PRIMARY KEY AUTOINCREMENT,nom TEXT, idgroup INTEGER REFERENCES groups(id))'
  );
});

let mainWindow: BrowserWindow | null = null;

ipcMain.on('send-mail', async (event, arg) => {
  db.all(
    `SELECT  groups.nom as groupname, mails.nom as mailname, mails.id as idmail  , groups.id as idgroup FROM mails join groups on groups.id = mails.idgroup where groups.id = '${arg.groupId}'`,
    (err, rows) => {
      if (err) {
        event.reply('send-mail', err.message);
      } else {
        let str = '';
        for (var i = 0; i < rows.length; i++) {
          str += `${rows[i].mailname},`;
        }
        const host = 'smtp.gmail.com';
        const from = 'tsantaniainarakotonjanahary@gmail.com';
        const password = 'snwcidailduftksy';
        const to = str;
        const html = arg.message
          .replace(/(\r\n|\r|\n)/g, '<br/>')
          .replace(/ /g, '\u00a0');
        const subject = arg.sujet;
        const attachments = arg.arr;

        nodemailer
          .createTransport({
            host,
            port: 587,
            secure: false,
            auth: {
              user: from,
              pass: password,
            },
          })
          .sendMail(
            {
              from,
              to,
              subject,
              html,
              attachments,
            },
            (error: { message: any }) => {
              if (error) event.reply('send-mail', error.message);
              else event.reply('send-mail', 'Email Envoyé');
            }
          );
      }
    }
  );
});

ipcMain.on('create-user', async (event, arg) => {
  const stmt = db.prepare(
    'INSERT INTO users (servername, email, password) VALUES (?,?,?)'
  );
  stmt.run(arg.servername, arg.email, arg.password);
  stmt.finalize();
  event.reply('create-user', 'user-saved');
});

ipcMain.on('create-mail-by-idgroup', async (event, arg) => {
  console.log(arg);
  const stmt = db.prepare('INSERT INTO mails (nom,idgroup) VALUES (?,?)');
  stmt.run(arg.mail, arg.idgroup);
  stmt.finalize();
  event.reply('create-mail-by-idgroup', 'mail-saved');
});

ipcMain.on('create-group', async (event, arg) => {
  const stmt = db.prepare('INSERT INTO groups (nom) VALUES (?)');
  stmt.run(arg.nom);
  stmt.finalize();
  event.reply('create-group', 'group-saved');
});

ipcMain.on('delete-group', async (event, arg) => {
  const stmt = db.prepare('DELETE FROM  groups WHERE id = ? ');
  stmt.run(arg.id);
  stmt.finalize();
  event.reply('delete-group', 'group-deleted');
});

ipcMain.on('delete-mail', async (event, arg) => {
  const stmt = db.prepare('DELETE FROM  mails WHERE id = ? ');
  stmt.run(arg.id);
  stmt.finalize();
  event.reply('delete-mail', 'mail-deleted');
});

ipcMain.on('get-user', async (event, arg) => {
  db.all(
    `SELECT * FROM users where email='${arg.email}' and password = '${arg.password}' `,
    (err, row) => {
      if (err) {
        return console.error(err.message);
      }
      event.reply('get-user', row || 'null');
    }
  );
});

ipcMain.on('get-all-groups', async (event, arg) => {
  db.all('SELECT * FROM groups', (err, row) => {
    event.reply('get-all-groups', row);
  });
});

ipcMain.on('get-mails-by-idgroup', async (event, arg) => {
  db.all(
    `SELECT  groups.nom as groupname, mails.nom as mailname, mails.id as idmail  , groups.id as idgroup FROM mails join groups on groups.id = mails.idgroup where groups.id = '${arg.idgroup}'`,
    (err, row) => {
      if (err) {
        console.log(err.message);
      }
      event.reply('get-mails-by-idgroup', row);
    }
  );
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      sandbox: false,
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);


ipcMain.on('auth', async (event,arg) =>
{
  const fs = require('fs').promises;
  const path = require('path');
  const process = require('process');
  const {authenticate} = require('@google-cloud/local-auth');
  const open = require('open');

  async function authorize() {
    let client = await authenticate({ scopes: ['https://mail.google.com/'], keyfilePath: path.join(process.cwd(), 'credentials.json'), });
    if (client.credentials) { console.log(client);   }
    return client;
  }
  authorize().then(()=>{ console.log("success"); }).catch(console.error);
})
