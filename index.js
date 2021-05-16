import LocalMessageDuplexStream from 'post-message-stream';

class DashDappConnect {
  constructor() {
    try {
      this.pageStream = new LocalMessageDuplexStream({
        name: 'DashPay:Dapp',
        target: 'DashPay:content',
      });
    } catch (e) {
      console.log('ERR', e);
      throw e;
    }
  }

  connect() {
    console.log('DDC connecting');
    this.pageStream.write({ name: 'connect', payload: null });

    const that = this;

    return new Promise((resolve) => {
      that.pageStream.on('data', async (data) => {
        if (data.name === 'onConnect' && data.payload != null) {
          console.log('promise event data', data);
          resolve(data);
        }
      });
    });
  }

  broadcast({ typeLocator, document }) {
    console.log('DDC broadcast', typeLocator, document);

    this.pageStream.write({
      name: 'broadcastDocument',
      payload: { typeLocator, document },
    });

    const that = this;

    return new Promise((resolve) => {
      that.pageStream.on('data', async (data) => {
        if (data.name === 'onBroadcastDocument') {
          console.log('promise event data', data);
          resolve(data);
        }
      });
    });
  }

  getConfirmedBalance() {
    console.log('DDC getConfirmedBalance');

    this.pageStream.write({
      name: 'getConfirmedBalance',
    });

    const that = this;

    return new Promise((resolve) => {
      that.pageStream.on('data', async (data) => {
        if (data.name === 'onGetConfirmedBalance') {
          console.log('promise event data', data);
          resolve(data);
        }
      });
    });
  }

  getUnusedAddress() {
    console.log('DDC getUnusedAddress');

    this.pageStream.write({
      name: 'getUnusedAddress',
    });

    const that = this;

    return new Promise((resolve) => {
      that.pageStream.on('data', async (data) => {
        if (data.name === 'onGetUnusedAddress') {
          console.log('promise event data', data);
          resolve(data);
        }
      });
    });
  }

  signMessage({ message }) {
    console.log('DDC signMessage', { message });

    this.pageStream.write({
      name: 'signMessage', payload: { message },
    });

    const that = this;

    return new Promise((resolve) => {
      that.pageStream.on('data', async (data) => {
        if (data.name === 'onSignMessage') {
          console.log('promise event data', data);
          resolve(data);
        }
      });
    });
  }

  verifyMessage({ message, signature, address }) {
    console.log('DDC verifyMessage', { message, signature, address });

    this.pageStream.write({
      name: 'verifyMessage', payload: { message, signature, address },
    });

    const that = this;

    return new Promise((resolve) => {
      that.pageStream.on('data', async (data) => {
        if (data.name === 'onVerifyMessage') {
          console.log('promise event data', data);
          resolve(data);
        }
      });
    });
  }

  encryptForIdentityECIES({ message, identity }) {
    console.log('DDC encryptForIdentityECIES', { message, identity });

    this.pageStream.write({
      name: 'encryptForIdentityECIES', payload: { message, identity },
    });

    const that = this;

    return new Promise((resolve) => {
      that.pageStream.on('data', async (data) => {
        console.log('data :>> ', data);
        if (data.name === 'onEncryptForIdentityECIES') {
          console.log('promise event data', data);
          resolve(data);
        }
      });
    });
  }

  decryptForIdentityECIES({ encrypted, identity }) {
    console.log('DDC decryptForIdentityECIES', { encrypted, identity });

    this.pageStream.write({
      name: 'decryptForIdentityECIES', payload: { encrypted, identity },
    });

    const that = this;

    return new Promise((resolve) => {
      that.pageStream.on('data', async (data) => {
        if (data.name === 'onDecryptForIdentityECIES') {
          console.log('promise event data', data);
          resolve(data);
        }
      });
    });
  }
}

export default DashDappConnect;
