# 🤝 **Web3 Digital Business Card : EthOnline 2022**

---

[![GitHub deployments](https://img.shields.io/github/deployments/Hackerthonweb3/business-card/production?label=deployment&logo=vercel&style=flat-square&color=00a550&logoColor=00a550)](https://web3card.vercel.app)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/Hackerthonweb3/business-card/Build%20Pipeline?logo=github&style=flat-square&color=00a550&logoColor=00a550)](https://github.com/Hackerthonweb3/business-card/actions/workflows/pipeline.yml)

Try out the demo, which [is hosted live here!](https://web3card.vercel.app)

## 🚀 **Statement**

**We are eager to continue the project after the hackathon in order to actually launch it in the world.**

## 🔥 **Our Challenge for Hackathon**

-   **Web3 Integration in Web2** - Build the Web3 version of your favorite Web2 product.
-   **Nfts** - Combine creativity with Engineering to build awesome NFT dApps.
-   **Designathon**

## 🎬 **Pitch & Live Demo (Video)**

Web3 Digital Business Card is a Dapp used by people in the web3 industry attending the conference to exchange contact information with people they meet in a more efficient and enjoyable way. Web3 Digital Business Card's profile can aggregate on- and off-chain data into a holistic identity that enables reliable networking and meaningful connections among users and organizations.

<p style="text-align: center;">
    <a href='https://youtu.be/isZ4Q'>
        <img src="https://user-images.githubusercontent.com/20131841/39-3f1768de2286.png" />
    </a>
</p>

## 💬 **Problem**

-   **It’s hard for Web3 People to remember everyone they meet at events and re-connect later.**

    -   As current Alternatives, some of them are documenting everything on Memo app or Spreadsheet.
    -   But due to the lack of effective identity gating, one usually ends up getting not connected at all or waking up every day to an inbox flooded by random DMs and spam.

-   **Web2 Social Media is Broken**
    -   Networks Sell your Data
        -   You pay with your personal information to utilize their services. There is no digital Privacy.
    -   User Data is Centralized
        -   Data is controlled by one party largely behind closed doors, making it susceptible to attacks.
    -   User Data is Not Portable
        -   In Web2 implementation of platforms like Linkedin and Facebook User’s data is owned and gated by the app.

## 💡 **Solution**

-   **By sharing your profile in a specially designed business card format in Web3 industry, you can quickly showcase who you are and why your connections are valuable.**

    -   **You can combine all of your contact information into one profile.**
    -   **You can also include other profile information in term of your identity and career.**
    -   **Profile data is exchanged and stored with each other using QR codes.**
    -   **Searchable Profile data.**
    -   **The issuance of SBTs to prove that they have met will make the connection between users stronger and more memorable and composable.**

-   **User can own social graph relationship’s data**

## 🤔 **Judges & Criteria**

### 1. Technological Implementation

#### Tech Stack

-   Front-End: NextJS, React, Typescript, Rainbowkit/Wagmi, Pixelated style
-   Contracts: Solidity
-   Back-End: Ceramic, Orbis, IPFS
-   Technologies: We are deployed on Polygon. We have ERC for test.

#### 📄 **Smart Contract Architecture**

Contracts were written with

-   **Why SBT?**：Proof of whom one has met can be a credential that enhances the credibility of the Wallet. And because for a credential to actually represent a person's characteristics, the credential must be non-transferable. Otherwise, it would be possible for a hedge fund to collect thousands of credentials and create a huge populace with a single click
-   Detail Implementation：

#### Use of Polygon：Deployed to Polygon to issue SBTs to prove that users have met each other

-   Why Polygon?：**The Web3 social experience must be as fast and cheap as Web2. Also, identity is about privacy. We thought Polygon, where ZK technology and other technologies are used, would be a good match for this as well.**
-   Detail Implementation：

#### Use of IPFS：We used IPFS to store the user's Avatar data and metadata

-   Why IPFS?：
-   Detail Implementation：

#### Use of AWS：Route53 was used to make the domain easy to understand

-   What is AWS, Route53?：Amazon Route 53 is a highly available and scalable Domain Name System (DNS) web service.
-   Why Route53?：This is because it is the easiest to register.
-   Detail Implementation：

<p style="text-align: center;">
    <img src="https://imagetforhackathon.s3.sa-east-1.amazonaws.co08-20+at+2.37.00+PM.png">
</p>

#### Use of Orbis.SDK on Ceramic：For both fast and cheap UX and data portability

-   What is Orbis.SDK on Ceramic：Ceramic is a mutable datastore tied to a DID, a wrapper for the Ceramic/Lit protocol that complements Ceramic and allows developers to focus on UI/UX.
-   Why Orbis.SDK on Ceramic?：The indexing experience is optimized to provide a faster experience than using Ceramic alone. And because it has data portability and can interface with multiple chains. It also saves time in implementation.
-   Detail Implementation：

### 2. Design

#### ① High Fidelity working prototype

-   Try out the demo about the design and flow of the project at [Figma](https://www.figma.coVwdj/map?node-id=0%3A1).

#### ② Presentation of Case Study

-   As the founder, I have attended over seven Web3 conferences around the world this year. There, I noticed the following problems The baffling dichotomy between Telegram and Twitter when exchanging contact information, and DM notes to remember who you have met. Taking selfies. Also, some of the people I met were not satisfied with the above means and were writing everything down in spreadsheets and note-taking apps. This was taken as proof of the challenge. Moreover, due to the lack of effective identity gating, one usually ends up getting not connected at all or waking up every day to an inbox flooded by random DMs and spam.

<p style="text-align: center;">
    <img src="https://imagetforhacka022-08-17+at+7.56.55+PM.png" width="300">
</p>

-   In the United States, losses from identity theft and related fraud grew from $1.8 billion in 2019 to $3.3 billion in 2020 and $5.8 billion in 2021 (FTC, 2022). As more and more of our lives shift to digital following the global pandemic, this problem continues to grow at a rapid pace.

-   A qualitative survey revealed that more than 90% of the respondents were not satisfied with existing social networking sites such as Telegram and Twitter.

#### ③ Problem-solving

-   Our product should provide the best UX to solve the above issues by sharing your profile in a specially designed business card format in Web3 industry, you can quickly showcase who you are and why your connections are valuable.

    -   **You can combine all of your contact information into one profile.**
    -   **You can also include other profile information in term of your identity and career.**
    -   **Profile data is exchanged and stored with each other using QR codes.**
    -   **Searchable Profile data.**
    -   **The issuance of SBTs to prove that they have met will make the connection between users stronger and more memorable and composable.**
    -   **User can own social graph relationship’s data**

#### ④ User flow and thought process

-   Try out the demo about the user flow and thought process at [Notion](https://ww-ebeda03aaeaf41088978ca13cb5dbd41) and [Miro](https://miro.com/app/board/uXjVPk_id=58842346750) and [Figma](https://www.dj/map?node-id=0%3A1).

#### ⑤ Branding and Design

#### Part 2: UX Problem Statement for an audience with little to no web3 awareness

-   Be faster and cheaper than other Web3 products while maintaining elements of data ownership and decentralization.

    -   We are able to optimize the data indexing experience.
    -   It's a choice for users whether or not to issue an SBT.

-   Users have authority over our own disclosure whether or not to make the data publicly available.
    -   In the conventional Dapp, many products are obligated to issue NFTs. However, we suggest that this be made optional. This way, users can choose to publish their data, and even if they choose not to issue NFTs or SBTs, the UX is good because it increases speed.

### 3. Potential Impact

#### ① Accelerating better encounters between people involved in Web3 can accelerate innovation in the ecosystem

-   This is Because Web3 Digital Business Card offers a better way for users in the web3 industry to network in a reliable and meaningful way. With more verifiable dimensions aggregated in the user's profile, you can now truly speak about who you are and present yourself in a complete and credible way, you have an overall identity.

-   This is because context-rich identities and more meaningful connections are built, and networks are easier to discover. You can expect to be contacted by more people who better understand your strengths, career aspirations, role in the community, and personal preferences. You will also be able to quickly find the people you want to contact, and your requests can be well communicated in support of your profile.

#### ② It will be a digital representation of an individual that does not rely on personally identifiable information (PII) such as name, gender, nationality, passport number, etc

-   Proof of whom one has met can be a credential that enhances the credibility of the Wallet. And because for a credential to actually represent a person's characteristics, the credential must be non-transferable. Otherwise, it would be possible for a hedge fund to collect thousands of credentials and create a huge populace with a single click.

-   I think one of the things we need to do is to strike a major blow to the dictatorial issues and imbalances in the cryptocurrency world. If we do that, you will be amazed at what will happen. Ideally, we need a system that works both to avoid economic elitism and to select people who are working on a particular topic with competence and passion. A good use of identity and reputation primitives could solve this problem.

#### ③ Reinventing Web2Social puts the power back in the hands of the user

-   test.

### 4. Quality of the Idea

#### How Creative

-   We develop this idea based on real customer problems.

#### How Unique

-   There are no products that specialize in business-card-like use cases, such as actually meeting people face to face and recording the meeting for Web3 people. We describe [here](https://www.f6a9feb70c93f75?v=d3a37aee9db345fe9569cb7e79cae048) the differences between us and other projects we have researched.
    -   POAP is optimized for conference attendance verification, others are optimized for profile functions only, Gitcoin Passport is optimized for Gitcoin, Telegram and Twitter are optimized for Web2 messaging and social networking experiences.
-   Very fast and inexpensive social experience compared to simlar did project.

    -   This is because we are building without relying on the only blockchain using the Ceramic protocol while ensuring de-centralization. And. It's well optimized to query specific data in a very efficient way (we are optimizing it for the entire protocol)by using OrbisSDK compared to similar project by using only Ceramic itself.

-   More Data potability

    -   This design decision would keep interoperability with all products built on top of Ceramic, Orbis.sdk, orbis.club included, while extending the usecase for our digital business card product (it is kind of personal POAPS + decentralized business card), we call it Web3 Digital Business Card.

-   Must be able to interface with a multi-chain.

    -   For example, if you don't like or don't want to use a certain theory, I don't think you should be forced to use it in order to be part of the identity web of the future. you are free to use Solana, or if you are David Gerard, you don't have to stick to the blockchain, you can use Open You are free to have your own identity, Google, Facebook, etc. with your ID, Web3 Digital Business Card can provide a UX that doesn't depend only on a particular chain.

-   Minting SBT instead of NFT is to prove that users have actually met compared to personal POAP.
    -   POAP's NFT is currently available for sale.

## 📓 **Appendix**

### 5. Our Product Roadmap

#### ① In conjunction with the POAP API, visualize the list of users who participated in a particular event to support networking

How creative and unique:

-   Many people are not satisfied with the encounters they have at the event. We can increase the likelihood of more enjoyable encounters if we can easily learn more about the attendees in advance; POAP's on-chain data and public APIs make this possible.

#### ② Adding more composable and sophisticated direct message functionality

How creative and unique

-   Telegram, Discord, Twitter, Messenger, Linkedin, What's app, Slack, LINE, WeChat, etc... Web2 has too many messaging tools that run on completely different protocols.There are some contexts for which data-portability will have more value than others, for example let's take DMs, the great benefit of composability is that you can bring your direct messages from one app to another and pick the user experience you like the most. For a platform dedicated 100% to video like youtube the data-portability would be useful to allow your followers to watch your content from any video app they want to (they aren't locked into one application)

#### ③ Launch on Mobile App like iOS and Android

How creative and unique:

-   To make Web3Social's products a product market fit for consumers, it is necessary to achieve a better UX, and a mobile experience is essential to this. There are only a few projects in the industry that are able to combine data portability and mobile.

#### ④ The current trade-offs in terms of attack vectors, potential future integration of ZK proofs to enhance privacy

How creative and unique:

#### ⑤ Adding Timeline feature for users

How creative and unique:

#### ⑥ Implement UI/UX for the organization or project on Web3 Digital Business Card

How creative and unique:

-   Our organizational profiles in Web3 Digital Business Card will be verified and trusted. To protect users from scams & fake links prevalent on Twitter and Discord, Web3 Digital Business Card verifies organizations by their existing official accounts such as Twitter. Organizations can also connect with other reputable entities and showcase it in the backers/partners/team sections. Issuing verifiable credentials or SBTs will also later be enabled for organizations to recognize key community contributors. A fabric of trust composed of such connections and records holds Web3 Digital Business Card profiles trustworthy. So users will be sure that the links they’re clicking on and all updates received are official.

### 6. What We Learned

### 7. Frequently questions

<details>
    <summary>Q1. Why this solution should work as a replacement for personal POAPs</summary>
    <div>
        A1. 折りたたむ（クリックしたら表示される）テキスト
    </div>
</details>

### 8. Team Members：Efforts were made from South America, Europe, the United States, and Japan. All are scheduled for ongoing development

-   Hidetaka Ko | Product Manager | We have been developing and operating Japan’s largest homestay matching service for 4 years as CEO/Co-Founder.
-   Asiya | Full Stack Software Engineer | I’m a SWE based between LA/NY, good with front end, like to build things.
-   Otto G | Full Stack Software Engineer | In blockchain space since 2013, full stack+solidity developer and investor, co-organizer Ethereum Meetup Spain.
-   Taiki Ikeda | UI Designer | Fluent in English and Japanese.

### 9. Resourses

-   [Twitter](https://twitter.comeb3)
-   [Discord](https://discord.gg/Rj6GW3h)
-   [Figma](https://www.figma.comle/YJ8RSB0YWbRDTGxbsXVwdj/map?node-id=0%3A1)
-   [Notion](https://www.notion.sa03aaeaf41088978ca13cb5dbd41)
-   [Miro](https://miro.com/app/be_link_id=58842346750)
-   Medium:Coming soon
-   WhitePaper:Coming soon
