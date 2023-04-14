import { app } from 'electron';
import serve from 'electron-serve';
import MainWindow from './mainWindow';
import SplashWindow from './splashWindow';
import Arduino from './arduino'
import delay from 'delay'

const isProd = process.env.NODE_ENV === 'production';


if (isProd) {
   serve({ directory: 'app' });
} else {
   app.setPath('userData', `${app.getPath('userData')} (development)`);
}

const createWindow = async () => {
   const splashWindow = new SplashWindow();
   const mainWindow = new MainWindow(isProd);
   const arduino = new Arduino();

   splashWindow.once('ready', () => {
      splashWindow.show();
   });


   mainWindow.on('ready', async () => {
      await delay(3000);
      splashWindow.close();
      mainWindow.show();
   });

}

(async () => {
   await app.whenReady();
   await createWindow();
})();

app.on('window-all-closed', () => {
   app.quit();
});



