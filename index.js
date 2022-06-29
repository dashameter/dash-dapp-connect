/* eslint-disable no-underscore-dangle */
// import LocalMessageDuplexStream from 'post-message-stream';
const LocalMessageDuplexStream = require("post-message-stream");

/* utils */
const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);
class DashDappConnect {
  constructor() {
    try {
      this.pageStream = new LocalMessageDuplexStream({
        name: "DashPay:Dapp",
        target: "DashPay:content",
      });
    } catch (e) {
      console.log("ERR", e);
      throw e;
    }
  }

  _promiseWrapper(name, payload) {
    console.log("dash-dapp-connect: sending", name, payload);

    this.pageStream.write({
      name,
      payload,
    });

    return new Promise((resolve) => {
      const capName = `on${capitalize(name)}`;

      this.pageStream.on("data", async (data) => {
        if (data.name === capName && data.payload != null) {
          console.log("dash-dapp-connect receiving", capName, data);
          resolve(data);
        }
      });
    });
  }

  connect() {
    return this._promiseWrapper.call(this, "connect", null);
  }

  broadcastDocument(payload) {
    return this._promiseWrapper.call(this, "broadcastDocument", payload);
  }

  broadcastDocumentBatch(payload) {
    return this._promiseWrapper.call(this, "broadcastDocumentBatch", payload);
  }

  createDocument(payload) {
    return this._promiseWrapper.call(this, "createDocument", payload);
  }

  getConfirmedBalance() {
    return this._promiseWrapper.call(this, "getConfirmedBalance", null);
  }

  getUnusedAddress() {
    return this._promiseWrapper.call(this, "getUnusedAddress", null);
  }

  signMessage(payload) {
    return this._promiseWrapper.call(this, "signMessage", payload);
  }

  verifyMessage(payload) {
    return this._promiseWrapper.call(this, "verifyMessage", payload);
  }

  encryptForIdentityECIES(payload) {
    return this._promiseWrapper.call(this, "encryptForIdentityECIES", payload);
  }

  decryptForIdentityECIES(payload) {
    return this._promiseWrapper.call(this, "decryptForIdentityECIES", payload);
  }
}

// export default DashDappConnect;
module.exports = DashDappConnect;
