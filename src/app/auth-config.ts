/**
 * This file contains authentication parameters. Contents of this file
 * is roughly the same across other MSAL.js libraries. These parameters
 * are used to initialize Angular and MSAL Angular configurations in
 * in app.module.ts file.
 */

import {
  LogLevel,
  Configuration,
  BrowserCacheLocation,
} from '@azure/msal-browser';

const isIE =
  window.navigator.userAgent.indexOf('MSIE ') > -1 ||
  window.navigator.userAgent.indexOf('Trident/') > -1;

/**
 * Enter here the user flows and custom policies for your B2C application,
 * To learn more about user flows, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/user-flow-overview
 * To learn more about custom policies, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-overview
 */
export const b2cPolicies = {
  names: {
    signUpSignIn: 'B2C_1_signInUp',
    editProfile: 'B2C_1_editProfile',
  },
  authorities: {
    signUpSignIn: {
      authority:
        'https://superstonks.b2clogin.com/superstonks.onmicrosoft.com/B2C_1_signInUp',
    },
    editProfile: {
      authority:
        'https://superstonks.b2clogin.com/superstonks.onmicrosoft.com/B2C_1_editProfile',
    },
  },
  authorityDomain: 'superstonks.b2clogin.com',
};

/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */
export const msalConfig: Configuration = {
  auth: {
    // clientId: '8439ed2b-ecfd-4e48-85d7-1863b37abb98', // This is the ONLY mandatory field that you need to supply.
    // authority: b2cPolicies.authorities.signUpSignIn.authority, // Defaults to "https://login.microsoftonline.com/common"
    clientId: '7c6dfea2-ff7b-4e36-8b11-08410e69f4e2', // This is the ONLY mandatory field that you need to supply.
    authority: 'https://superstonks.b2clogin.com/superstonks.onmicrosoft.com/B2C_1_signInUp' , // Defaults to "https://login.microsoftonline.com/common"
    knownAuthorities: [b2cPolicies.authorityDomain], // Mark your B2C tenant's domain as trusted.
    redirectUri: 'http://localhost:4200', // Points to window.location.origin. You must register this URI on Azure portal/App Registration.
    postLogoutRedirectUri: '/', // Indicates the page to navigate after logout.
    navigateToLoginRequestUrl: true, // If "true", will navigate back to the original request location before processing the auth code response.
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage, // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
    storeAuthStateInCookie: isIE, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback(logLevel: LogLevel, message: string) {
        console.log(message);
      },
      logLevel: LogLevel.Verbose,
      piiLoggingEnabled: false,
    },
  },
};

/**
 * An optional silentRequest object can be used to achieve silent SSO
 * between applications by providing a "login_hint" property.
 */
export const silentRequest = {
  scopes: ['openid', 'profile'],
  loginHint: 'example@domain.net',
};

// THese are the protected resources, that need authenication in order to be accessed
export const protectedResources = {
  customerApi: {
    endpoint: "https://localhost:4200/customer/home",
    scopes: ["https://superstonks.onmicrosoft.com/7c6dfea2-ff7b-4e36-8b11-08410e69f4e2/Files.Customer"]
  }
}
