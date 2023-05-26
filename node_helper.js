/* Magic Mirror
 * Module: MMM-TTS
 *
 * By fewieden https://github.com/fewieden/MMM-TTS
 *
 * MIT Licensed.
 */

/* eslint-env node */

const NodeHelper = require('node_helper');
const exec = require('child_process').exec;

module.exports = NodeHelper.create({

    start() {
        console.log(`Starting node helper for: ${this.name}`);
    },

    socketNotificationReceived(notification, payload) {
        if (notification === 'CONFIG') {
            this.config = payload;
        } else if (notification === 'TTS') {
            exec("echo '"+payload+"' | sudo nanotts --wav -v de-DE --speed 0.8 --pitch 1.0 --volume 0.7 ; aplay nanotts-output-0001.wav ; sudo rm nanotts-output-* ", (err, stdout, stderr) => {
              if (err) {
                console.error(err);
                return;
              }
              console.log(stdout);
            });
            this.sendSocketNotification('HIDE', {});     
        }
    }
});
