# Video Conferencing App Using Flask and Twilio

With the impact of Covid-19 forcing many people to work from home, the use of video conferencing apps such as Zoom and Google Meet (among many others) has shot up. This is an attempt to create a similar video conferencing application using Flask and Twilio :sweat_smile:.

![Ona Ana Video App](app/static/img/ona_ana.gif)

### Tools Used
* Python and vanilla JavaScript for programming
* Flask Web framework
* Twilio Programmable Video for the backend
* Ngrok for temporary `HTTP` provision
* Heroku for hosting

### Features
* Basic user authentication before accessing a video call room
* Display of user video
* Display of other participants video feeds
* Access to all participants audio while in the call
* Display of participants names in the video call
* Display of number of participants in a call before joining
* User can disconnect from the video call

### Deployed Application
* [Ona Ana Video Conferencing App](https://ona-ana-video-app.herokuapp.com/)

### Testing

To successfully test this application, ensure you have the following first:

* A Twilio account. Create a [free Twilio account](https://www.twilio.com/try-twilio?promo=WNPWrR) now.
* A web browser compatible with the Twilio Programmable Video JavaScript library. Check your browser among [this list](https://www.twilio.com/docs/video/javascript).
* Python 3.6 and above.
* This project makes use of `Ngrok`. Ngrok provides public URLs that redirect to the application. If you do not know what it is or how to use it, refer to the reference section at the end of this article.

Once you have an account with Twilio:
* Click [Console Dashboard](https://www.twilio.com/console), 
* Click [Settings](https://www.twilio.com/console/project/settings) then,
* Click [API Keys](https://www.twilio.com/console/project/api-keys)
* Create your project API Key by clicking on the Red Plus(+) button. You will be provided with API Key SID and API Key Secret. 
* Click 'Create API Key' button to save.

Note that when you save your keys, the API Secret Key will never be shown again. Make sure to save it somewhere else safe because you will need to use it.

Following the `.env.template` format seen in the project's root directory, add these keys including your Twilio Account SID  seen from the [Dashboard Console](https://www.twilio.com/console).

Now you are ready to run this application from your terminal.

1. Clone this repo:

```python
$ git@github.com:GitauHarrison/video-conferencing-app-using-flask-and-twilio.git
```

2. Move into the cloned directory:

```python
$ cd video-conferencing-app-using-flask-and-twilio
```

3. Create and activate your virtual environment:

```python
$ mkvirtualenv ona_ana_video_app # I am using virtualenvwrapper
```

4. Install all the project requirements within your virtual environment:

```python
(ona_ana_video_app)$ pip3 install requirements.txt
```

5. Before you can run your server, remember to create a `.env` file following the guidance seen in the `.env.template`. Create a `.env` file in the root directory:

```python
(ona_ana_video_app)$ touch .env
```

6. Update the `.env` file with all the necessary details.

```python
MAIL_SERVER=
MAIL_PORT=
MAIL_USE_TLS=
MAIL_USERNAME=
MAIL_PASSWORD=
ADMINS=
```

7. Fire up the flask server:

```python
(ona_ana_video_app)$ flask run
```

Once your application is running, you can access your localhost on http://127.0.0.1:5000/. Additionally, if you look carefully in your terminal, you will see * Tunnel URL: NgrokTunnel: "http://4209c9af6d43.ngrok.io" -> "http://localhost:5000"

The HTTP value may be different from the one shown here because I am using the free tier package of `ngrok`. Paste the link http://4209c9af6d43.ngrok.io on another device, say your mobile phone, to test the application while it is on localhost.

Most web browsers do not allow `http//:` when working with video calls. Therefore we need to generate a secure public URL that redirects to the application. 

Open a new terminal window (consider using [byobu](https://www.byobu.org/)) and run `ngrok`:

```python
(ona_ana_video_app)$ ngrok http 5000

# Output

ngrok by @inconshreveable                                                  (Ctrl+C to quit)
                                                                                           
Session Status                online                                                       
Session Expires               1 hour, 59 minutes                                           
Version                       2.3.35                                                       
Region                        United States (us)                                           
Web Interface                 http://127.0.0.1:4041                                        
Forwarding                    http://13c58a13e6c2.ngrok.io -> http://localhost:5000        
Forwarding                    https://13c58a13e6c2.ngrok.io -> http://localhost:5000       
                                                                                           
Connections                   ttl     opn     rt1     rt5     p50     p90                  
                              0       0       0.00    0.00    0.00    0.00
```

Note the lines beginning with 'Forwarding'. These show the public URLs that ngrok uses to redirect requests into our service. We will make use of the `https//:` URL.

Copy the `https//:` url to another device, say your smartphone or another computer. You should be able to access the application. Click the 'Join Call' button to test it out.

### Call For Collaboration

My intention is to eventually  have an app with better security and far simpler intuitive design. If you would be interested in this, please feel free to reach out, and let us build an amazing video conferencing application.

Check [this design](https://www.figma.com/proto/kDRrcS8b0OJywkhH0Qm4LQ/Ona-Ana-Video-App?node-id=3%3A2&scaling=min-zoom) to see more.

### Reference
1. If you do not know what `ngrok` is or how to use it, consider to [look here](https://gitauharrison-blog.herokuapp.com/ngrok) for more information.
2. Virtualenvwrapper makes creating, activating and generally using virtual environments a lot easier. Learn more [here](https://gitauharrison-blog.herokuapp.com/virtualenvwrapper).
3. If you are new to flask, [begin here](https://gitauharrison-blog.herokuapp.com/personal-blog).
4. If you would like to build this project from scratch rather than run the contents of this repo, learn how to do that [here](https://github.com/GitauHarrison/notes/blob/master/video_call_app.md).