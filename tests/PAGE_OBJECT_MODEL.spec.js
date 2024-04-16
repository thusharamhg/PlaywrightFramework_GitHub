const { test, expect } = require('@playwright/test');
//import {test, expect} from '@playwright/test'

const testData = require('../test_Data/testdata.json'); 

import { LoginPage } from '../Pages_POM/LoginPage';
import { HomePage } from '../Pages_POM/HomePage';
import { CartPage } from '../Pages_POM/CartPage';


const fs = require('fs');
const path = require('path');
const logFilePath = path.join(__dirname, '../Logs/testlogs.txt');

// Function to log to both console and file with timestamp
function log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}`;
    console.log(logMessage);
    try {
        fs.appendFileSync(logFilePath, logMessage + '\n');
    } catch (error) {
        console.error('Error writing to log file:', error);
    }
}



test('POM', async ({page}) => {

//Login
const login = new LoginPage(page);

console.log("Navigating to login page...");
await login.gotoLoginPage();

console.log("Logging in with username:", testData.username);
await login.login(testData.username,testData.password);

await page.waitForTimeout(3000);


//Home
const home = new HomePage(page);
await home.addProductToCart("Iphone 6 32gb");
await page.waitForTimeout(3000);
await home.gotoCart();

//Cart
const cart = new CartPage(page);
await page.waitForTimeout(3000);
const status = await cart.checkProductInCart("Iphone 6 32gb");
expect (await status).toBe(true);


})




        


