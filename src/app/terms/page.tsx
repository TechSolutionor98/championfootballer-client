import React from 'react'

function TermConditions() {
    const content = [
        "AGREEMENT TO TERMS",
        "INTELLECTUAL PROPERTY RIGHTS",
        "USER REPRESENTATIONS",
        "USER REGISTRATION",
        "PROHIBITED ACTIVITIES",
        "USER GENERATED CONTRIBUTIONS",
        "CONTRIBUTION LICENSE",
        "MOBILE APPLICATION LICENSE",
        "SUBMISSIONS",
        "ADVERTISERS",
        "SITE MANAGEMENT",
        "PRIVACY POLICY",
        "COPYRIGHT INFRINGEMENTS",
        "TERM AND TERMINATION",
        "MODIFICATIONS AND INTERRUPTIONS",
        "GOVERNING LAW",
        "DISPUTE RESOLUTION",
        "CORRECTIONS",
        "DISCLAIMER",
        "LIMITATIONS OF LIABILITY",
        "INDEMNIFICATION",
        "USER DATA",
        "ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES",
        "CALIFORNIA USERS AND RESIDENTS",
        "MISCELLANEOUS",
        "CONTACT US"
    ];

    const prohibitedActivities = [
        "Systematically retrieve data or other content from the Site to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.",
        "Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.",
        "Circumvent, disable, or otherwise interfere with security-related features of the Site, including features that prevent or restrict the use or copying of any Content or enforce limitations on the use of the Site and/or the Content contained therein.",
        "Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Site.",
        "Use any information obtained from the Site in order to harass, abuse, or harm another person.",
        "Make improper use of our support services or submit false reports of abuse or misconduct.",
        "Use the Site in a manner inconsistent with any applicable laws or regulations.",
        "Engage in unauthorized framing of or linking to the Site.",
        "Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material, including excessive use of capital letters and spamming (continuous posting of repetitive text), that interferes with any party’s uninterrupted use and enjoyment of the Site or modifies, impairs, disrupts, alters, or interferes with the use, features, functions, operation, or maintenance of the Site.",
        "Engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering and extraction tools.",
        "Delete the copyright or other proprietary rights notice from any Content.",
        "Attempt to impersonate another user or person or use the username of another user.",
        "Upload or transmit (or attempt to upload or to transmit) any material that acts as a passive or active information collection or transmission mechanism, including without limitation, clear graphics interchange formats (“gifs”), 1×1 pixels, web bugs, cookies, or other similar devices (sometimes referred to as “spyware” or “passive collection mechanisms” or “pcms”).",
        "Interfere with, disrupt, or create an undue burden on the Site or the networks or services connected to the Site.",
        "Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of the Site to you.",
        "Attempt to bypass any measures of the Site designed to prevent or restrict access to the Site, or any portion of the Site.",
        "Copy or adapt the Site’s software, including but not limited to Flash, PHP, HTML, JavaScript, or other code.",
        "Except as permitted by applicable law, decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any way making up a part of the Site.",
        "Except as may be the result of standard search engine or Internet browser usage, use, launch, develop, or distribute any automated system, including without limitation, any spider, robot, cheat utility, scraper, or offline reader that accesses the Site, or using or launching any unauthorized script or other software.",
        "Use a buying agent or purchasing agent to make purchases on the Site.",
        "Make any unauthorized use of the Site, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email, or creating user accounts by automated means or under false pretenses.",
        "Use the Site as part of any effort to compete with us or otherwise use the Site and/or the Content for any revenue-generating endeavor or commercial enterprise.",
        "Use the Site to advertise or offer to sell goods and services.",
        "Sell or otherwise transfer your profile."
    ];

    const contributionRules = [
        "The creation, distribution, transmission, public display, or performance, and the accessing, downloading, or copying of your Contributions do not and will not infringe the proprietary rights, including but not limited to the copyright, patent, trademark, trade secret, or moral rights of any third party.",
        "You are the creator and owner of or have the necessary licenses, rights, consents, releases, and permissions to use and to authorize us, the Site, and other users of the Site to use your Contributions in any manner contemplated by the Site and these Terms of Use.",
        "You have the written consent, release, and/or permission of each and every identifiable individual person in your Contributions to use the name or likeness of each and every such identifiable individual person to enable inclusion and use of your Contributions in any manner contemplated by the Site and these Terms of Use.",
        "Your Contributions are not false, inaccurate, or misleading.",
        "Your Contributions are not unsolicited or unauthorized advertising, promotional materials, pyramid schemes, chain letters, spam, mass mailings, or other forms of solicitation.",
        "Your Contributions are not obscene, lewd, lascivious, filthy, violent, harassing, libellous, slanderous, or otherwise objectionable (as determined by us).",
        "Your Contributions do not ridicule, mock, disparage, intimidate, or abuse anyone.",
        "Your Contributions are not used to harass or threaten (in the legal sense of those terms) any other person and to promote violence against a specific person or class of people.",
        "Your Contributions do not violate any applicable law, regulation, or rule.",
        "Your Contributions do not violate the privacy or publicity rights of any third party.",
        "Your Contributions do not violate any applicable law concerning child pornography, or otherwise intended to protect the health or well-being of minors.",
        "Your Contributions do not include any offensive comments that are connected to race, national origin, gender, sexual preference, or physical handicap.",
        "Your Contributions do not otherwise violate, or link to material that violates, any provision of these Terms of Use, or any applicable law or regulation."
    ];

    return (
        <div className='p-6 bg-[#d6ffd1]'>
            <h1 className='text-[30px] font-semibold leading-9 mt-5' >Terms & Conditions</h1>
            <div className='text-lg font-bold leading-6 mt-5'>
                {"Last updated August 22, 2022"}
            </div>
            <div>
                <h3 className='text-lg font-bold mt-5 leading-6' >
                    TABLE OF CONTENTS
                </h3>
                <div className="space-y-3 mt-5 p-3">
                    {content.map((item, index) => (
                        <div key={index} className="text-lg leading-6">
                            {index + 1}. {item}
                        </div>
                    ))}
                </div>


            </div>
            <div>
                <h3 className='text-lg font-bold mt-5 leading-6' >
                    AGREEMENT TO TERMS
                </h3>
                <p className='text-lg leading-6 mt-5'>
{"                    These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and Champion Footballer, concerning your access to and use of the championfootballer.com website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the “Site”). We are registered in England and have our registered address at 85 Great Portland St, London, England, W1W 7LT. You agree that by accessing the Site, you have read, understood, and agreed to be bound by all of these Terms of Use. IF YOU DO NOT AGREE WITH ALL OF THESE TERMS OF USE, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SITE AND YOU MUST DISCONTINUE USE IMMEDIATELY."}                </p>
                <p className='text-lg leading-6 mt-5'>
{`                    Supplemental terms and conditions or documents that may be posted on the Site from time to time are hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make changes or modifications to these Terms of Use from time to time. We will alert you about any changes by updating the “Last updated” date of these Terms of Use, and you waive any right to receive specific notice of each such change. Please ensure that you check the applicable Terms every time you use our Site so that you understand which Terms apply. You will be subject to, and will be deemed to have been made aware of and to have accepted, the changes in any revised Terms of Use by your continued use of the Site after the date such revised Terms of Use are posted.
`}                </p>
                <p className='text-lg leading-6 mt-5'>
{`                    The information provided on the Site is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Site from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.
`}                </p>
                <p className='text-lg leading-6 mt-5'>
{`                    The Site is not tailored to comply with industry-specific regulations (Health Insurance Portability and Accountability Act (HIPAA), Federal Information Security Management Act (FISMA), etc.), so if your interactions would be subjected to such laws, you may not use this Site. You may not use the Site in a way that would violate the Gramm-Leach-Bliley Act (GLBA).
`}                </p>
                <p className='text-lg leading-6 mt-5'>
{`                    The Site is intended for users who are over 13 years of age. All users who are minors in the jurisdiction in which they reside (generally under the age of 18) must have the permission of, and be directly supervised by, their parent or guardian to use the Site. <span className='text-lg font-bold leading-6'> If you are a minor, you must have your parent or guardian read and agree to these Terms of Use prior to you using the Site.</span>
`}                </p>
                <p className='text-lg leading-6 mt-5'>
{`                    We may change these terms at any time by amending this page. Please check this page regularly to take notice of any such changes as you will be deemed to accept them through your continued use of the Website and the App.
`}                </p>
            </div>
            <div>
                <h3 className='text-lg font-bold mt-5 leading-6' >
                    INTELLECTUAL PROPERTY RIGHTS
                </h3>
                <p className='text-lg leading-6 mt-5'>
{`                    Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws of the United States, international copyright laws, and international conventions. The Content and the Marks are provided on the Site “AS IS” for your information and personal use only. Except as expressly provided in these Terms of Use, no part of the Site and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.
`}                </p>
                <p className='text-lg leading-6 mt-5'>
{`                    Provided that you are eligible to use the Site, you are granted a limited license to access and use the Site and to download or print a copy of any portion of the Content to which you have properly gained access solely for your personal, non-commercial use. We reserve all rights not expressly granted to you in and to the Site, the Content and the Marks.
`}                </p>
            </div>
            <div>
                <h3 className='text-lg font-bold mt-5 leading-6' >
                    USER REPRESENTATIONS
                </h3>
                <p className='text-lg leading-6 mt-5'>
{`                    By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Terms of Use; (4) you are not under the age of 13; (5) you are not a minor in the jurisdiction in which you reside, or if a minor, you have received parental permission to use the Site; (6) you will not access the Site through automated or non-human means, whether through a bot, script, or otherwise; (7) you will not use the Site for any illegal or unauthorized purpose; and (8) your use of the Site will not violate any applicable law or regulation.
`}                </p>
                <p className='text-lg leading-6 mt-5'>
{`                    If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your account and refuse any and all current or future use of the Site (or any portion thereof).
`}                </p>
            </div>
            <div>
                <h3 className='text-lg font-bold mt-5 leading-6' >
                    USER REPRESENTATIONS
                </h3>
                <p className='text-lg leading-6 mt-5'>
{`                    You may be required to register with the Site. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.
`}                </p>
            </div>
            <div>
                <h3 className='text-lg font-bold mt-5 leading-6' >
                    PROHIBITED ACTIVITIES
                </h3>
                <p className='text-lg leading-6 mt-5'>
{`                    You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavours except those that are specifically endorsed or approved by us.
`}                </p>
                <p className='text-lg leading-6 mt-5'>
{`                    As a user of the Site, you agree not to:
`}                </p>
                <div className="px-4 pl-6 py-6">
                    <ul className="list-disc text-lg leading-6 mt-5">
                        {prohibitedActivities.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div>
                <h3 className='text-lg font-bold mt-5 leading-6' >
                    USER GENERATED CONTRIBUTIONS
                </h3>
                <p className='text-lg leading-6 mt-5'>
{`                    The Site may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and other functionality, and may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or on the Site, including but not limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or personal information or other material (collectively, "Contributions"). Contributions may be viewable by other users of the Site and through third-party websites. As such, any Contributions you transmit may be treated as non-confidential and non-proprietary. When you create or make available any Contributions, you thereby represent and warrant that:
`}                </p>
                <div className="px-4 py-6 pl-6">
                    <ul className="list-disc text-lg leading-6 mt-5">
                        {contributionRules.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
                <p className='text-lg leading-6 mt-5'>
{`                    Any use of the Site in violation of the foregoing violates these Terms of Use and may result in, among other things, termination or suspension of your rights to use the Site.
`}                </p>
            </div>
            <div>
                <h3 className='text-lg font-bold mt-5 leading-6' >
                    CONTRIBUTION LICENSE
                </h3>
                <p className='text-lg leading-6 mt-5'>
{`                    By posting your Contributions to any part of the Site, you automatically grant, and you represent and warrant that you have the right to grant, to us an unrestricted, unlimited, irrevocable, perpetual, non-exclusive, transferable, royalty-free, fully-paid, worldwide right, and license to host, use, copy, reproduce, disclose, sell, resell, publish, broadcast, retitle, archive, store, cache, publicly perform, publicly display, reformat, translate, transmit, excerpt (in whole or in part), and distribute such Contributions (including, without limitation, your image and voice) for any purpose, commercial, advertising, or otherwise, and to prepare derivative works of, or incorporate into other works, such Contributions, and grant and authorize sublicenses of the foregoing. The use and distribution may occur in any media formats and through any media channels.
`}                </p>
                <p className='text-lg leading-6 mt-5'>
{`                    This license will apply to any form, media, or technology now known or hereafter developed, and includes our use of your name, company name, and franchise name, as applicable, and any of the trademarks, service marks, trade names, logos, and personal and commercial images you provide. You waive all moral rights in your Contributions, and you warrant that moral rights have not otherwise been asserted in your Contributions.
`}                </p>
                <p className='text-lg leading-6 mt-5'>
{`                    We do not assert any ownership over your Contributions. You retain full ownership of all of your Contributions and any intellectual property rights or other proprietary rights associated with your Contributions. We are not liable for any statements or representations in your Contributions provided by you in any area on the Site. You are solely responsible for your Contributions to the Site and you expressly agree to exonerate us from any and all responsibility and to refrain from any legal action against us regarding your Contributions.
`}                </p>
                <p className='text-lg leading-6 mt-5'>
{`                    We have the right, in our sole and absolute discretion, (1) to edit, redact, or otherwise change any Contributions; (2) to re-categorize any Contributions to place them in more appropriate locations on the Site; and (3) to pre-screen or delete any Contributions at any time and for any reason, without notice. We have no obligation to monitor your Contributions.
`}                </p>
            </div>
            <div>
                <h3 className='text-lg font-bold mt-5 leading-6' >
                    MOBILE APPLICATION LICENSE
                </h3>
                <h3 className='text-lg font-bold mt-5 leading-6' >
                    Use License
                </h3>
                <p className='text-lg leading-6 mt-5'>
{`                    If you access the Site via a mobile application, then we grant you a revocable, non-exclusive, non-transferable, limited right to install and use the mobile application on wireless electronic devices owned or controlled by you, and to access and use the mobile application on such devices strictly in accordance with the terms and conditions of this mobile application license contained in these Terms of Use. You shall not: (1) except as permitted by applicable law, decompile, reverse engineer, disassemble, attempt to derive the source code of, or decrypt the application; (2) make any modification, adaptation, improvement, enhancement, translation, or derivative work from the application; (3) violate any applicable laws, rules, or regulations in connection with your access or use of the application; (4) remove, alter, or obscure any proprietary notice (including any notice of copyright or trademark) posted by us or the licensors of the application; (5) use the application for any revenue generating endeavour, commercial enterprise, or other purpose for which it is not designed or intended; (6) make the application available over a network or other environment permitting access or use by multiple devices or users at the same time; (7) use the application for creating a product, service, or software that is, directly or indirectly, competitive with or in any way a substitute for the application; (8) use the application to send automated queries to any website or to send any unsolicited commercial e-mail; or (9) use any proprietary information or any of our interfaces or our other intellectual property in the design, development, manufacture, licensing, or distribution of any applications, accessories, or devices for use with the application.
`}                </p>
            </div>
            <div>
                <h3 className='text-lg font-bold mt-5 leading-6' >
                    Apple and Android Devices
                </h3>
                <p className='text-lg leading-6 mt-5'>
{`                    The following terms apply when you use a mobile application obtained from either the Apple Store or Google Play (each an “App Distributor”) to access the Site: (1) the license granted to you for our mobile application is limited to a non-transferable license to use the application on a device that utilizes the Apple iOS or Android operating systems, as applicable, and in accordance with the usage rules set forth in the applicable App Distributor’s terms of service; (2) we are responsible for providing any maintenance and support services with respect to the mobile application as specified in the terms and conditions of this mobile application license contained in these Terms of Use or as otherwise required under applicable law, and you acknowledge that each App Distributor has no obligation whatsoever to furnish any maintenance and support services with respect to the mobile application; (3) in the event of any failure of the mobile application to conform to any applicable warranty, you may notify the applicable App Distributor, and the App Distributor, in accordance with its terms and policies, may refund the purchase price, if any, paid for the mobile application, and to the maximum extent permitted by applicable law, the App Distributor will have no other warranty obligation whatsoever with respect to the mobile application; (4) you represent and warrant that (i) you are not located in a country that is subject to a U.S. government embargo, or that has been designated by the U.S. government as a “terrorist supporting” country and (ii) you are not listed on any U.S. government list of prohibited or restricted parties; (5) you must comply with applicable third-party terms of agreement when using the mobile application, e.g., if you have a VoIP application, then you must not be in violation of their wireless data service agreement when using the mobile application; and (6) you acknowledge and agree that the App Distributors are third-party beneficiaries of the terms and conditions in this mobile application license contained in these Terms of Use, and that each App Distributor will have the right (and will be deemed to have accepted the right) to enforce the terms and conditions in this mobile application license contained in these Terms of Use against you as a third-party beneficiary thereof.
`}                </p>
            </div>
            <div>
                <h3 className='text-lg font-bold mt-5 leading-6' >
                    SUBMISSIONS
                </h3>
                <p className='text-lg leading-6 mt-5'>
{`                    You acknowledge and agree that any questions, comments, suggestions, ideas, feedback, or other information regarding the Site ("Submissions") provided by you to us are non-confidential and shall become our sole property. We shall own exclusive rights, including all intellectual property rights, and shall be entitled to the unrestricted use and dissemination of these Submissions for any lawful purpose, commercial or otherwise, without acknowledgment or compensation to you. You hereby waive all moral rights to any such Submissions, and you hereby warrant that any such Submissions are original with you or that you have the right to submit such Submissions. You agree there shall be no recourse against us for any alleged or actual infringement or misappropriation of any proprietary right in your Submissions.
`}                </p>
            </div>
            <div>
                <h3 className='text-lg font-bold mt-5 leading-6' >
                    ADVERTISERS
                </h3>
                <p className='text-lg leading-6 mt-5'>
{`                    We allow advertisers to display their advertisements and other information in certain areas of the Site, such as sidebar advertisements or banner advertisements. If you are an advertiser, you shall take full responsibility for any advertisements you place on the Site and any services provided on the Site or products sold through those advertisements. Further, as an advertiser, you warrant and represent that you possess all rights and authority to place advertisements on the Site, including, but not limited to, intellectual property rights, publicity rights, and contractual rights. We simply provide the space to place such advertisements, and we have no other relationship with advertisers.
`}                </p>
            </div>
            <div>
                <h3 className='text-lg font-bold mt-5 leading-6' >
                    SITE MANAGEMENT
                </h3>
                <p className='text-lg leading-6 mt-5'>
{`                    We reserve the right, but not the obligation, to: (1) monitor the Site for violations of these Terms of Use; (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these Terms of Use, including without limitation, reporting such user to law enforcement authorities; (3) in our sole discretion and without limitation, refuse, restrict access to, limit the availability of, or disable (to the extent technologically feasible) any of your Contributions or any portion thereof; (4) in our sole discretion and without limitation, notice, or liability, to remove from the Site or otherwise disable all files and content that are excessive in size or are in any way burdensome to our systems; and (5) otherwise manage the Site in a manner designed to protect our rights and property and to facilitate the proper functioning of the Site.
`}                </p>
            </div>
            <div>
                <h3 className='text-lg font-bold mt-5 leading-6' >
                    PRIVACY POLICY
                </h3>
                <p className='text-lg leading-6 mt-5'>
{`                    We care about data privacy and security. By using the Site, you agree to be bound by our Privacy Policy posted on the Site, which is incorporated into these Terms of Use. Please be advised the Site is hosted in England. If you access the Site from any other region of the world with laws or other requirements governing personal data collection, use, or disclosure that differ from applicable laws in England, then through your continued use of the Site, you are transferring your data to England, and you agree to have your data transferred to and processed in (% assign num_website_hosting_country_uk = website_hosting_country_uk | times: 1 %) England. Further, we do not knowingly accept, request, or solicit information from children or knowingly market to children. Therefore, in accordance with the U.S. Children’s Online Privacy Protection Act, if we receive actual knowledge that anyone under the age of 13 has provided personal information to us without the requisite and verifiable parental consent, we will delete that information from the Site as quickly as is reasonably practical.
`}                </p>
            </div>
            <div>
                <h3 className='text-lg font-bold mt-5 leading-6' >
                    TERM AND TERMINATION
                </h3>
                <p className='text-lg leading-6 mt-5'>
{`                    These Terms of Use shall remain in full force and effect while you use the Site. WITHOUT LIMITING ANY OTHER PROVISION OF THESE TERMS OF USE, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SITE (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE TERMS OF USE OR OF ANY APPLICABLE LAW OR REGULATION. WE MAY TERMINATE YOUR USE OR PARTICIPATION IN THE SITE OR DELETE YOUR ACCOUNT AND ANY CONTENT OR INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT WARNING, IN OUR SOLE DISCRETION.
`}                </p>
                <p className='text-lg leading-6 mt-5'>
{`                    If we terminate or suspend your account for any reason, you are prohibited from registering and creating a new account under your name, a fake or borrowed name, or the name of any third party, even if you may be acting on behalf of the third party. In addition to terminating or suspending your account, we reserve the right to take appropriate legal action, including without limitation pursuing civil, criminal, and injunctive redress.
`}                </p>
            </div>
            <div>
                <h3 className='text-lg font-bold mt-5 leading-6' >
                    MODIFICATIONS AND INTERRUPTIONS
                </h3>
                <p className='text-lg leading-6 mt-5'>
{`                    We reserve the right to change, modify, or remove the contents of the Site at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Site. We also reserve the right to modify or discontinue all or part of the Site without notice at any time. We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Site.
`}                </p>
                <p className='text-lg leading-6 mt-5'>
{`                    We cannot guarantee the Site will be available at all times. We may experience hardware, software, or other problems or need to perform maintenance related to the Site, resulting in interruptions, delays, or errors. We reserve the right to change, revise, update, suspend, discontinue, or otherwise modify the Site at any time or for any reason without notice to you. You agree that we have no liability whatsoever for any loss, damage, or inconvenience caused by your inability to access or use the Site during any downtime or discontinuance of the Site. Nothing in these Terms of Use will be construed to obligate us to maintain and support the Site or to supply any corrections, updates, or releases in connection therewith.
`}                </p>
            </div>
            <div>
                <h3 className='text-lg font-bold mt-5 leading-6' >
                    GOVERNING LAW
                </h3>
                <p className='text-lg leading-6 mt-5'>
{`                    These conditions are governed by and interpreted following the laws of England, and the use of the United Nations Convention of Contracts for the International Sale of Goods is expressly excluded. If your habitual residence is in the EU, and you are a consumer, you additionally possess the protection provided to you by obligatory provisions of the law of your country of residence. Champion Footballer and you both agree to submit to the non-exclusive jurisdiction of the courts of London, which means that you may make a claim to defend your consumer protection rights in regards to these Terms of Use in England, or in the EU country in which you reside
`}                </p>
            </div>
            <h3 className='text-lg font-bold mt-5 leading-6' >
                DISPUTE RESOLUTION
            </h3>
            <div>
                <h3 className='text-lg font-bold mt-5 leading-6' >
                    Informal Negotiations
                </h3>
                <p className='text-lg leading-6 mt-5'>
{`                    To expedite resolution and control the cost of any dispute, controversy, or claim related to these Terms of Use (each "Dispute" and collectively, the “Disputes”) brought by either you or us (individually, a “Party” and collectively, the “Parties”), the Parties agree to first attempt to negotiate any Dispute (except those Disputes expressly provided below) informally for at least ninety (90) days before initiating arbitration. Such informal negotiations commence upon written notice from one Party to the other Party.
`}                </p>
            </div>
            <div>
                <h3 className='text-lg font-bold mt-5 leading-6' >
                    Binding Arbitration
                </h3>
                <p className='text-lg leading-6 mt-5'>
{`                    Any dispute arising from the relationships between the Parties to this contract shall be determined by one arbitrator who will be chosen in accordance with the Arbitration and Internal Rules of the European Court of Arbitration being part of the European Centre of Arbitration having its seat in Strasbourg, and which are in force at the time the application for arbitration is filed, and of which adoption of this clause constitutes acceptance. The seat of arbitration shall be London, England. The language of the proceedings shall be English. Applicable rules of substantive law shall be the law of England.
`}                </p>
            </div>
            <div>
                <h3 className='text-lg font-bold mt-5 leading-6' >
                    Restrictions
                </h3>
                <p className='text-lg leading-6 mt-5'>
{`                    The Parties agree that any arbitration shall be limited to the Dispute between the Parties individually. To the full extent permitted by law, (a) no arbitration shall be joined with any other proceeding; (b) there is no right or authority for any Dispute to be arbitrated on a class-action basis or to utilize class action procedures; and (c) there is no right or authority for any Dispute to be brought in a purported representative capacity on behalf of the general public or any other persons.
`}                </p>
            </div>
            <div>
                <h3 className='text-lg font-bold mt-5 leading-6' >
                    Exceptions to Informal Negotiations and Arbitration
                </h3>
                <p className='text-lg leading-6 mt-5'>
{`                    The Parties agree that the following Disputes are not subject to the above provisions concerning informal negotiations and binding arbitration: (a) any Disputes seeking to enforce or protect, or concerning the validity of, any of the intellectual property rights of a Party; (b) any Dispute related to, or arising from, allegations of theft, piracy, invasion of privacy, or unauthorized use; and (c) any claim for injunctive relief. If this provision is found to be illegal or unenforceable, then neither Party will elect to arbitrate any Dispute falling within that portion of this provision found to be illegal or unenforceable and such Dispute shall be decided by a court of competent jurisdiction within the courts listed for jurisdiction above, and the Parties agree to submit to the personal jurisdiction of that court.
`}                </p>
            </div>
            <div>
                <h3 className='text-lg font-bold mt-5 leading-6' >
                    CORRECTIONS
                </h3>
                <p className='text-lg leading-6 mt-5'>
{`                    There may be information on the Site that contains typographical errors, inaccuracies, or omissions, including descriptions, pricing, availability, and various other information. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on the Site at any time, without prior notice.
`}                </p>
            </div>
            <div>
                <h3 className='text-lg font-bold mt-5 leading-6' >
                    DISCLAIMER
                </h3>
                <p className='text-lg leading-6 mt-5'>
{`                    THE SITE IS PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SITE AND OUR SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SITE AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE SITE’S CONTENT OR THE CONTENT OF ANY WEBSITES LINKED TO THE SITE AND WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (1) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS, (2) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE SITE, (3) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION STORED THEREIN, (4) ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE SITE, (5) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE TRANSMITTED TO OR THROUGH THE SITE BY ANY THIRD PARTY, AND/OR (6) ANY ERRORS OR OMISSIONS IN ANY CONTENT AND MATERIALS OR FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE SITE. WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR ANY PRODUCT OR SERVICE ADVERTISED OR OFFERED BY A THIRD PARTY THROUGH THE SITE, ANY HYPERLINKED WEBSITE, OR ANY WEBSITE OR MOBILE APPLICATION FEATURED IN ANY BANNER OR OTHER ADVERTISING, AND WE WILL NOT BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND ANY THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES. AS WITH THE PURCHASE OF A PRODUCT OR SERVICE THROUGH ANY MEDIUM OR IN ANY ENVIRONMENT, YOU SHOULD USE YOUR BEST JUDGMENT AND EXERCISE CAUTION WHERE APPROPRIATE.
`}                </p>
            </div>
            <div>
                <h3 className='text-lg font-bold mt-5 leading-6' >
                    LIMITATIONS OF LIABILITY
                </h3>
                <p className='text-lg leading-6 mt-5'>
{`                    IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SITE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
`}                </p>
            </div>
            <div>
                <h3 className='text-lg font-bold mt-5 leading-6' >
                    INDEMNIFICATION
                </h3>
                <p className='text-lg leading-6 mt-5'>
{`                    You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys’ fees and expenses, made by any third party due to or arising out of: (1) your Contributions; (2) use of the Site; (3) breach of these Terms of Use; (4) any breach of your representations and warranties set forth in these Terms of Use; (5) your violation of the rights of a third party, including but not limited to intellectual property rights; or (6) any overt harmful act toward any other user of the Site with whom you connected via the Site. Notwithstanding the foregoing, we reserve the right, at your expense, to assume the exclusive defence and control of any matter for which you are required to indemnify us, and you agree to cooperate, at your expense, with our defence of such claims. We will use reasonable efforts to notify you of any such claim, action, or proceeding which is subject to this indemnification upon becoming aware of it.
`}                </p>
            </div>
            <div>
                <h3 className='text-lg font-bold mt-5 leading-6' >
                    USER DATA
                </h3>
                <p className='text-lg leading-6 mt-5'>
{`                    We will maintain certain data that you transmit to the Site for the purpose of managing the performance of the Site, as well as data relating to your use of the Site. Although we perform regular routine backups of data, you are solely responsible for all data that you transmit or that relates to any activity you have undertaken using the Site. You agree that we shall have no liability to you for any loss or corruption of any such data, and you hereby waive any right of action against us arising from any such loss or corruption of such data.
`}                </p>
            </div>
            <div>
                <h3 className='text-lg font-bold mt-5 leading-6' >
{`                    ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES
`}                </h3>
                <p className='text-lg leading-6 mt-5'>
{`                    Visiting the Site, sending us emails, and completing online forms constitute electronic communications. You consent to receive electronic communications, and you agree that all agreements, notices, disclosures, and other communications we provide to you electronically, via email and on the Site, satisfy any legal requirement that such communication be in writing. YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA THE SITE. You hereby waive any rights or requirements under any statutes, regulations, rules, ordinances, or other laws in any jurisdiction which require an original signature or delivery or retention of non-electronic records, or to payments or the granting of credits by any means other than electronic means.
`}                </p>
            </div>
            <div>
                <h3 className='text-lg font-bold mt-5 leading-6' >
{`                    CALIFORNIA USERS AND RESIDENTS
`}                </h3>
                <p className='text-lg leading-6 mt-5'>
{`                    If any complaint with us is not satisfactorily resolved, you can contact the Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs in writing at 1625 North Market Blvd., Suite N 112, Sacramento, California 95834 or by telephone at (800) 952-5210 or (916) 445-1254.
`}                </p>
            </div>
            <div>
                <h3 className='text-lg font-bold mt-5 leading-6' >
                    MISCELLANEOUS
                </h3>
                <p className='text-lg leading-6 mt-5'>
{`                    These Terms of Use and any policies or operating rules posted by us on the Site or in respect to the Site constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision of these Terms of Use shall not operate as a waiver of such right or provision. These Terms of Use operate to the fullest extent permissible by law. We may assign any or all of our rights and obligations to others at any time. We shall not be responsible or liable for any loss, damage, delay, or failure to act caused by any cause beyond our reasonable control. If any provision or part of a provision of these Terms of Use is determined to be unlawful, void, or unenforceable, that provision or part of the provision is deemed severable from these Terms of Use and does not affect the validity and enforceability of any remaining provisions. There is no joint venture, partnership, employment or agency relationship created between you and us as a result of these Terms of Use or use of the Site. You agree that these Terms of Use will not be construed against us by virtue of having drafted them. You hereby waive any and all defences you may have based on the electronic form of these Terms of Use and the lack of signing by the parties hereto to execute these Terms of Use.
`}                </p>
            </div>
            <div>
                <h3 className='text-lg font-bold mt-5 leading-6' >
                    CONTACT US
                </h3>
                <p className='text-lg leading-6 mt-5'>
{`                    In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:
`}                </p>
                <p className='text-lg leading-6 mt-5'>
                    Champion Footballer
                        <br/>
                    First Floor
                        <br/>
                    85 Great Portland St,
                    <br/>
                    London, England,
                    <br/>
                    W1W 7LL
                    <br/>
                    Email: championfootballer@outlook.com
                </p>
            </div>
        </div>
    )
}

export default TermConditions