const baseUrl = 'http://localhost:3030/api';

const urls = {

  authReg:{
    register: `${baseUrl}/auth/signup`,
    auth:`${baseUrl}/auth/signin`
  },

  profile:{
    editProfile:`${baseUrl}/profile/edit`
  }
};

export {urls};
