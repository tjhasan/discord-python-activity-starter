# Discord Activities with Python

This example code is meant to be a starting point for developers looking to create a Discord Activity with a Python backend.

The backend in this case will be created with Flask, but really you can use any Python backend you'd like.

This project assumes that the user is relatively new to web development, but has some basic Python, Javascript, and web development knowledge. I'll try my best to explain how everything works in the comments of the `app.py` and `main.js` files.

This project only sets up the activity to authorize users via the client. I stopped here as the rest of the actitivty creation process is essentially building on top of the fundamentals up to that point.

## Requirements

Required software:

* Python 3.x
* Nodejs
* Vite
* cloudflared

Install the required python packages by running the following command while in the project directory:

```terminal
pip install -r requirements.txt
```

Install the required node packages by running the following command while in the `client` directory.

Create an app in the Discord Developer Portal and set your `.env` variable as described in the official documentation found [here](https://discord.com/developers/docs/activities/building-an-activity)

## How to Run

Open terminal cd into the project directory and run the following command:

```
cd client
npm run dev
```

With the client running, open a **new** terminal window, cd into the project directory and run the following command:
```
cloudflared tunnel --url http://localhost:5173
```

With the tunnel created, be sure to update the url mapping for your app in the Discord Developer Portal. [Take a look at the official documentation if you don't know how to do this.](https://discord.com/developers/docs/activities/building-an-activity)

I recommend you minimize this terminal and never turn it off as restarting the tunnel will result in a new url. You can restart the client and the server with new code without having to restart the tunnel.

With the tunnel created, open a **new** terminal window, cd into the project directory and run the following command:
```
cd server
python app.py
```

Now you should be able to run your activity in Discord and authenticate via the client!

## Troubleshooting

If you run all of the above and still get a white screen or some sort of error message while running the activity you most likely have a misconfigured tunnel port. This is relatively easy to fix. 

Run the server code using `python app.py` and look at the url being used. This will be in the line `Running on <url>`. Copy this urlm, including the http and the port and paste it into the `vite.config.js` file for the `target` variable. 

Now run all processes again following the instructions above.



