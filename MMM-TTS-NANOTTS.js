/* global Module Log */

/* Magic Mirror
 * Module: MMM-TTS-NANOTTS
 *
 * Original By fewieden https://github.com/fewieden/MMM-TTS
 *
 * MIT Licensed.
 */

Module.register('MMM-TTS-NANOTTS', {
    tts: '',

    defaults: {
        text: 'MMM-TTS-NANOTTS',
        voice: null,
        speed: 1.0,
        debug: true
    },

    start() {
        Log.info(`Starting module: ${this.name}`);
        this.tts = this.config.text;
        this.sendSocketNotification('CONFIG', this.config);
    },

    notificationReceived(notification, payload) {
        if (notification === 'MMM-TTS-NANOTTS') {
            this.sendSocketNotification('TTS', payload);
            this.tts = payload;
            this.updateDom();
        }
    },

    socketNotificationReceived(notification) {
        if (notification === 'HIDE') {
            this.tts = this.config.text;
            this.updateDom();
        }
    },

    getDom() {
        const wrapper = document.createElement('div');
        if (this.config.debug === true) {
            wrapper.classList.add('thin', 'small', 'bright');
            wrapper.innerHTML = this.tts;
        }
        return wrapper;
    }
});
