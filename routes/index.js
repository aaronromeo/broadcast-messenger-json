var express = require('express');
var router = express.Router();

var audioFragment = {
  "attachment":{
    "type":"audio",
    "payload":{
      "url":"https://petersapparel.com/bin/clip.mp3"
    }
  }
};

var fileAttachmentFragment = {
  "attachment":{
    "type":"file",
    "payload":{
      "url":"https://petersapparel.com/bin/receipt.pdf"
    }
  }
};

var imageAttachmentFragment = {
  "attachment":{
    "type":"image",
    "payload":{
      "url":"https://petersapparel.com/img/shirt.png"
    }
  }
};

var textFragment = {
  "text":"hello, world!"
};

var videoAttachmentFragment = {
  "attachment":{
    "type":"video",
    "payload":{
      "url":"https://petersapparel.com/bin/clip.mp4"
    }
  }
};

var templateWithButtonFragment = {
  "attachment":{
    "type":"template",
    "payload":{
      "template_type":"generic",
      "elements":[
        {
          "title":"Breaking News: Record Thunderstorms",
          "subtitle":"The local area is due for record thunderstorms over the weekend.",
          "image_url":"https://thechangreport.com/img/lightning.png",
          "buttons":[
            {
              "type":"element_share"
            }
          ]
        }
      ]
    }
  }
};

var quickTextReply = {
  "content_type":"text",
  "title":"Red",
  "payload":"broadcast:red"
}

var quickLocationReply = {
  "content_type":"location"
}

var messageBundle = {
  "message":{}
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Broadcast JSON mockup', message: messageBundle });
});

router.param('modification', function (req, res, next, value) {
  if (value === 'text-message') {
    messageBundle["message"] = textFragment;
  } else if (value === 'audio-message') {
    messageBundle["message"] = audioFragment;
  } else if (value === 'file-message') {
    messageBundle["message"] = fileAttachmentFragment;
  } else if (value === 'image-message') {
    messageBundle["message"] = imageAttachmentFragment;
  } else if (value === 'video-message') {
    messageBundle["message"] = videoAttachmentFragment;
  } else if (value === 'template-message') {
    messageBundle["message"] = templateWithButtonFragment;
  } else {
    messageBundle["message"]["quick_replies"] = messageBundle["message"]["quick_replies"] || [];
    if (value === 'text-quick-reply') {
      messageBundle["message"]["quick_replies"].push(quickTextReply);
    } else if (value === 'location-quick-reply') {
      messageBundle["message"]["quick_replies"].push(quickLocationReply);
    } else if (value === 'remove-quick-reply') {
      delete messageBundle["message"]["quick_replies"];
    };
  };
  next();
});

router.get('/switch-option/:modification', function(req, res) {
  res.redirect('/');
});

router.post('/', function (req, res) {
  // var xhr = new XMLHttpRequest()
  // xhr.open("POST", url, true);
  // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
  // xhr.send(someStuff);
  res.send('Sending the following data to the server...\n' + req.body.message_field + '\n' + req.body.recipient_ids);
});

module.exports = router;
