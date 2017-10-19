# Valhalla
======
###### Discord Bot written in JavaScript with Discord.js

Usage for noob nerds:
1. Install `node` and `npm`;
    apt-get:
    ```
    $ sudo apt-get install npm
    ```
2. Update if needed with `n` or `nvm`;
    ```
    $ node install -g n
    ```
3. Install Discord.js;
    ```
    $ node install discord.js node-opus --save
    ```
    Use `opusscript` instead of `node-opus` in case something goes wrong

4. Run `node src/bot.js`
5. To properly use it, make a `config.json` file under `src`:
    ```json
    {
        "token":"your-app-token-here",
        "prefix":"your-bot-prefix"
    }
    ```