---
title: "Secret, Cipher, and Cryptography"
date: 2022-10-08T23:59:47+07:00
draft: false
tags: [networking, chinese]
---

## Thers is some Chinese

One of my Chinese learning partners posted on his WeChat 江姐：来，我告诉你一个大的秘密 coming with an image of two cats likely talking to each other. I had a chat with a Chinese friend a few minutes also about the security of WeChat. The word 秘密(secret) reminded me of the book about Ciphers & Cryptography. The idea of completing this dialogue suddenly came up in my mind.

江姐：来，我告诉你一个大的秘密\
李哥：啥？你要告诉我啥秘密？\
江姐：【小声音】\
李哥：你说啥我听不懂啊\
江姐：原因是秘密已被加密了

Jiang Jie: Come here, I wanna tell you a secret\
Li Ge: What? What’s secret?\
Jiang Jie: *(whispering)*\
Li Ge: You said what I don’t understand\
Jiang Jie: Because the secret is encrypted

The dialogue is just nothing rather than I wanted to practice my Chinese and added some new Chinese words in the context of cryptography.

## A bit further with HTTP over SSL/TLS

Jiang Jie and Li Ge play the roles of Bob and Alice in comp sci class. If Li Ge wants to know the original meaning of the encrypted message (secret), Jiang Jie must provide him a knowledge (cipher) of how to decrypt it. The key is known by both friends as so called shared key and is used to encrypt and decrypt the encrypted message called symmetric encryption. This is a very typical encryption technique that started from the beginning of cryptography.

If Li Ge whispers to Jiang Jie about the shared key. What would happen if a 3rd person were able to hear both the secret and the shared key? The shared key again becomes a message that needs protecting and this addresses back the original problem of securing the secret.

HTTP over SSL/TLS securing the network connection is a useful analogy to deal with this problem. Before application data can be transmitted between client and server, a handshake including 3 main phases: Hello, Certificate Exchange, and Key Exchange must be done to establish a secure connection.

- Hello: client and server get to know each other if they both agree on SSL/TLS version and cipher suite.
- Certificate Exchange: server must prove its identity by providing SSL/TLS certificate to the client. The client then either trusts the certificate or the certificate itself is trusted by a CA (Certificate Authority).
- Key Exchange: The client randomly generates a shared key using a symmetric encryption algorithm that was agreed upon both sides in the cipher suite of the Hello phase, encrypt it with the server’s public key (which is found in the trusted certificate in Certificate Exchange phase), send it to server. The server finally decrypts it using its private key.

Once client and server now both hold the shared key to secure application data during transmission. The thing here is, they use asymmetric encryption where the key to decrypt is different from the key used to encrypt. The server safely stores its private key and makes the public key visible to everyone. So if Jiang Jie wants to tell Li Ge how to understand the secret message securely, she may consider the same mechanism.

HTTP over SSL/TLS uses symmetric and asymmetric encryption because symmetric encryption is way faster and more efficient than asymmetric encryption. There is a need for more secure transfer (confidentiality and integrity), the asymmetric is preferred.

## Is WeChat safe?

Surprisingly WeChat does not offer end-to-end encryption. It only supports client-server encryption using the symmetric AES 256 algorithm. Since the mechanism is not end-to-end encryption, it always leaves there the possibility that a 3rd party or WeChat itself snoops or even makes a copy of encrypted messages through backdoor access. We never know what security measures are set in the middle of a transmission.

Text and media messages only live on WeChat servers for 72 and 120 hours respectively and no one even 3rd translation service providers can make use of them for analytical purposes or data mining.

WeChat only persists users’ messages on their devices. That’s why you need to transfer the entire SQLite DB to your new devices when you change your phone. I believe Zalo and LINE use the same technique but they also offer cloud backup.

Though WeChat claims that its protection mechanism is safe, it faces a security risk. It ranked last in Amnesty International 2016 for security measurement. LINE and Zalo are shipped with end-to-end encryption but are not enabled by default or limited to message types.

## References

- Can you crack the code? A Fascinating History of Cipers and Cryptography
- Computer Networking A Top-Down Approach 6th Edition – Kurose James F. & Ross Keith W
- [https://linecorp.com/en/security/encryption/2020h1](https://linecorp.com/en/security/encryption/2020h1)
- [https://robertheaton.com/2014/03/27/how-does-https-actually-work/](https://robertheaton.com/2014/03/27/how-does-https-actually-work/)
- [https://courses.csail.mit.edu/6.857/2019/project/3-Chen-Clayberg-Li.pdf](https://courses.csail.mit.edu/6.857/2019/project/3-Chen-Clayberg-Li.pdf)
- [https://help.zalo.me/huong-dan/chuyen-muc/nhan-tin-va-goi/ma-hoa-dau-cuoi-bao-mat-toi-uu-cho-tro-chuyen/](https://help.zalo.me/huong-dan/chuyen-muc/nhan-tin-va-goi/ma-hoa-dau-cuoi-bao-mat-toi-uu-cho-tro-chuyen/)
- [https://help.wechat.com/cgi-bin/micromsg-bin/oshelpcenter?opcode=2&plat=1&lang=en&id=1208117b2mai1410243yyQFZ&Channel=helpcenter](https://help.wechat.com/cgi-bin/micromsg-bin/oshelpcenter?opcode=2&plat=1&lang=en&id=1208117b2mai1410243yyQFZ&Channel=helpcenter)
- [https://www.amnesty.org/en/latest/campaigns/2016/10/which-messaging-apps-best-protect-your-privacy/](https://www.amnesty.org/en/latest/campaigns/2016/10/which-messaging-apps-best-protect-your-privacy/)