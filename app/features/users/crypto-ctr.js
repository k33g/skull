// Nodejs encryption with CTR

import crypto from 'crypto';

let algorithm = 'aes-256-ctr';

export default function (secret) {

  return {
    encrypt: function (text) {
      let cipher = crypto.createCipher(algorithm, secret);
      var crypted = cipher.update(text,'utf8','hex');
      crypted += cipher.final('hex');
      return crypted;
    },
    decrypt: function (text) {
      let decipher = crypto.createDecipher(algorithm,secret);
      var dec = decipher.update(text,'hex','utf8');
      dec += decipher.final('utf8');
      return dec;
    }
  };

}

