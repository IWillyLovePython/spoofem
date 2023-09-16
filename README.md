# spoofem by cereb#8577
cool panel on roblox to show u "own" an account, execute w js  




steps:  
execute index.js on a person's roblox profile  
then the panel will appear at the bottom of the page  
drag it up  
use buttons and stuff  

```
fetch("https://raw.githubusercontent.com/IWillyLovePython/spoofem/main/index.js")
  .then(response => response.text())
  .then(rawJS => {
    eval(rawJS);
  })
  .catch(error => {
    console.error('Error fetching or executing JavaScript: ', error);
  });
```


  ![image](https://github.com/IWillyLovePython/spoofem/assets/104280094/72845167-7927-492f-af06-6ba53ec967ff)
