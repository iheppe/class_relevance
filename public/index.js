"use strict";
(function() {
  window.addEventListener("load", init);

  function init() {
    var uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
          var user = authResult.user;
          var credential = authResult.credential;
          var isNewUser = authResult.additionalUserInfo.isNewUser;
          var providerId = authResult.additionalUserInfo.providerId;
          var operationType = authResult.operationType;
          // Do something with the returned AuthResult.
          // Return type determines whether we continue the redirect
          // automatically or whether we leave that to developer to handle.
          return true;
        },
        signInFailure: function(error) {
          // Some unrecoverable error occurred during sign-in.
          // Return a promise when error handling is completed and FirebaseUI
          // will reset, clearing any UI. This commonly occurs for error code
          // 'firebaseui/anonymous-upgrade-merge-conflict' when merge conflict
          // occurs. Check below for more details on this.
          return handleUIError(error);
        },
        uiShown: function() {
          // The widget is rendered.
          // Hide the loader.
          //document.getElementById('loader').style.display = 'none';
        }
      },
      credentialHelper: firebaseui.auth.CredentialHelper.NONE,
      // Query parameter name for mode.
      queryParameterForWidgetMode: 'mode',
      // Query parameter name for sign in success url.
      queryParameterForSignInSuccessUrl: 'signInSuccessUrl',
      // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
      signInFlow: 'popup',
      signInSuccessUrl: 'home.html',
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ]
    };
    let ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', uiConfig);
  }

})();