# WAR

Write cucumber style tests in mocha without the overhead of gherkin:

```
var given = require('war');
var scenario = it;

describe('widget', function(){
  scenario('user checks out', function(){
    return given('a product exists in a users basket', createProductInBasket).
           when('a user checks out', checkoutUser).
           then('the purchase is complete', verifyPurchaseComplete).
           and('the money is credit to the bank account', moneyIsInAccount)
  });
});
```
