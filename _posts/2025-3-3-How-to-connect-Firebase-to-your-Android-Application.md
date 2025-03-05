---
tile: How to connect Firebase to your Android Application
author: Joshua
layout: tocPost
description: "This blog Covers how to connect Firebase to your Android Application. 2 Videos are included as wells as fully step by step guide to help you learn Firebase"
tags: How-to
thumbnail: /assets/images/posts/3-3-2025-How-to-connect-Firebase-to-your-Android-Application/maxresdefault2.jpg
toc:
  - "Requirments"
  - "Setting up a firebase project"
  - "Connecting a Firebase project to Android application"
  - "References" 
---

<div id="carouselExampleInterval" class="carousel slide border rounded document w-100 mb-3 overflow-hidden">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
  </div>
<div class="carousel-inner" style="max-height: 350px;">
    <div class="carousel-item active">
            <iframe  class='w-100  ' height='350'  src='https://www.youtube.com/embed/X6TjMzZ8eak?si=76ho6nagIPdhbNYq' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' referrerpolicy='strict-origin-when-cross-origin' allowfullscreen></iframe>
    </div>
    <div class="carousel-item">
            <iframe class='w-100  ' height='350' src='https://www.youtube.com/embed/v8GkqTYs6Kg?si=8Ko82rSwR5UydINe' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' referrerpolicy='strict-origin-when-cross-origin' allowfullscreen></iframe>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

## About 
You can watch the videos in the carousel for extra information. The steps below are short step by step guid that will show you how to set up firebase with your android application. This blog was a set of instruction from a school project as found in repo linked below. This repo provides example code for Creating, reading, update and deleting object from the firebase database. The videos link above will cover all of these operations. This document doesn't. It will show you how to link database to you application.

[firebaseresearchproject](https://bitbucket.org/joshuamckenna/firebaseresearchproject/src/main/)

###### Requirments 
* Google Account
* Android Studio **(Or you will have to do extra steps not listed in this tutorial)**

## Creating a firebase project
#### Step 1: Create Google account

Go to [https://console.firebase.google.com](https://console.firebase.google.com) and login into your google account. Then click Add Project

<figure class="figure">
    <img class="figure-img img-fluid rounded" alt="Step1 Add Project.png" src="/assets/images/posts/3-3-2025-How-to-connect-Firebase-to-your-Android-Application/Step1%20Add%20Project.png"/>
    <figcaption class="figure-caption">Captured image by <a href="https://www.linkedin.com/in/mfoneedwinngwa/">Edwin Ngwa Mfoe</a></figcaption>
</figure>

#### Step 2: Choose a Name for you project

Enter the name for your firebase project. (It doesn't really matter)

<figure class="figure">
    <img class="figure-img img-fluid rounded" alt="Step2 ProjectName.png" src="/assets/images/posts/3-3-2025-How-to-connect-Firebase-to-your-Android-Application/Step2 ProjectName.png"/>
    <figcaption class="figure-caption">Captured image by <a href="https://www.linkedin.com/in/mfoneedwinngwa/">Edwin Ngwa Mfoe</a></figcaption>
</figure>

### Connecting a Firebase project to Android application ###
#### Step 3: login into google in Android studios

Open android studio and sign into Google Which can befound in the top right corner of android studio. Make Sure to use the same google as
you used to make your firebase project.

<figure class="figure">
    <img class="figure-img img-fluid rounded" alt="Step3 SiginGmail.png" src="/assets/images/posts/3-3-2025-How-to-connect-Firebase-to-your-Android-Application/Step3 SiginGmail.png"/>
    <figcaption class="figure-caption">Captured image by <a href="https://www.linkedin.com/in/mfoneedwinngwa/">Edwin Ngwa Mfoe</a></figcaption>
</figure>

#### Step 4

Go on the window bar go to ``Tools > Firebase``

<figure class="figure">
    <img class="figure-img img-fluid rounded" alt="Step4 ToolsFirebase.png" src="/assets/images/posts/3-3-2025-How-to-connect-Firebase-to-your-Android-Application/Step4 ToolsFirebase.png"/>
    <figcaption class="figure-caption">Captured image by <a href="https://www.linkedin.com/in/mfoneedwinngwa/">Edwin Ngwa Mfoe</a></figcaption>
</figure>

#### Step 5

Click on Realtime Database. Then two links should appear Click on ``Get Started with Realtime Database [JAVA]``

<figure class="figure">
    <img class="figure-img img-fluid rounded" alt="Step5 RealTimeDatabse.png" src="/assets/images/posts/3-3-2025-How-to-connect-Firebase-to-your-Android-Application/Step5 RealTimeDatabse.png"/>
    <figcaption class="figure-caption">Captured image by <a href="https://www.linkedin.com/in/mfoneedwinngwa/">Edwin Ngwa Mfoe</a></figcaption>
</figure>

#### Step 6 ###

Click ``Connect to Firebase``

<figure class="figure">
    <img class="figure-img img-fluid rounded" alt="Step6 ConnectFirebase.png" src="/assets/images/posts/3-3-2025-How-to-connect-Firebase-to-your-Android-Application/Step6 ConnectFirebase.png"/>
    <figcaption class="figure-caption">Captured image by <a href="https://www.linkedin.com/in/mfoneedwinngwa/">Edwin Ngwa Mfoe</a></figcaption>
</figure>

#### Step 7 

A window should open in your browser which opens to the firebase console. Select the firebase project that you want to
connect to your application

<figure class="figure">
    <img class="figure-img img-fluid rounded" alt="Step7 ChooseProoject.png" src="/assets/images/posts/3-3-2025-How-to-connect-Firebase-to-your-Android-Application/Step7 ChooseProoject.png"/>
    <figcaption class="figure-caption">Captured image by <a href="https://www.linkedin.com/in/mfoneedwinngwa/">Edwin Ngwa Mfoe</a></figcaption>
</figure>

#### Step 8 

If firebase has been connected properly this screen should appear

<figure class="figure">
    <img class="figure-img img-fluid rounded" alt="Step8 Conncect.png" src="/assets/images/posts/3-3-2025-How-to-connect-Firebase-to-your-Android-Application/Step8 Conncect.png"/>
    <figcaption class="figure-caption">Captured image by <a href="https://www.linkedin.com/in/mfoneedwinngwa/">Edwin Ngwa Mfoe</a></figcaption>
</figure>

#### Step 9 

now go back to Android studio and the page from step 6 should be still open and click the same button as circled below
A window should appear and click Accept changes. It will make changes to your gradle file as show in step 10

<figure class="figure">
    <img class="figure-img img-fluid rounded" alt="Step9 AddRealTime.png" src="/assets/images/posts/3-3-2025-How-to-connect-Firebase-to-your-Android-Application/Step9 AddRealTime.png"/>
    <figcaption class="figure-caption">Captured image by <a href="https://www.linkedin.com/in/mfoneedwinngwa/">Edwin Ngwa Mfoe</a></figcaption>
</figure>

#### Step 10 

<figure class="figure">
    <img class="figure-img img-fluid rounded" alt="Step10 DependencyAdded.png" src="/assets/images/posts/3-3-2025-How-to-connect-Firebase-to-your-Android-Application/Step10 DependencyAdded.png"/>
    <figcaption class="figure-caption">Captured image by <a href="https://www.linkedin.com/in/mfoneedwinngwa/">Edwin Ngwa Mfoe</a></figcaption>
</figure>

#### Step 11

Go back to your [https://console.firebase.google.com/](https://console.firebase.google.com/) and open up your firebase project.
Then on the navigation bar on the left go to  ``Build > Realtime Database > Create Database``
And select the location you want your database. Then click next

<figure class="figure">
    <img class="figure-img img-fluid rounded" alt="Step11 CreateRealTime Database.png" src="/assets/images/posts/3-3-2025-How-to-connect-Firebase-to-your-Android-Application/Step11 CreateRealTime Database.png"/>
    <figcaption class="figure-caption">Captured image by <a href="https://www.linkedin.com/in/mfoneedwinngwa/">Edwin Ngwa Mfoe</a></figcaption>
</figure>

#### Step 10 

Before you click next again make sure you select testing mode. and the rules below should be set to true
or else you won't be able to read or write to the database.

<figure class="figure">
    <img class="figure-img img-fluid rounded" alt="Step12  ChangeToTrue.png" src="/assets/images/posts/3-3-2025-How-to-connect-Firebase-to-your-Android-Application/Step12  ChangeToTrue.png"/>
    <figcaption class="figure-caption">Captured image by <a href="https://www.linkedin.com/in/mfoneedwinngwa/">Edwin Ngwa Mfoe</a></figcaption>
</figure>

#### Step 11 

Add this object to the top of your class where you are going to make a connection to the database as shown below.

<figure class="figure">
    <img class="figure-img img-fluid rounded" alt="Step13 DatabaseReference.png" src="/assets/images/posts/3-3-2025-How-to-connect-Firebase-to-your-Android-Application/Step13 DatabaseReference.png"/>
    <figcaption class="figure-caption">Captured image by <a href="https://www.linkedin.com/in/mfoneedwinngwa/">Edwin Ngwa Mfoe</a></figcaption>
</figure>

#### Step 12 
Enter the code in below and now you have access to your realtime database from you android application
The .child is where you would put the name of the collection **(Its like a table's name in a mysql database)**

<figure class="figure">
    <img class="figure-img img-fluid rounded" alt="Step14 RefToconncetDb.png" src="/assets/images/posts/3-3-2025-How-to-connect-Firebase-to-your-Android-Application/Step14 RefToconncetDb.png"/>
    <figcaption class="figure-caption">Captured image by <a href="https://www.linkedin.com/in/mfoneedwinngwa/">Edwin Ngwa Mfoe</a></figcaption>
</figure>


### References ###

#### Video Tutorial

- [Beginner's Guide to Firebase Real time Database Integration with Android Java](https://youtu.be/X6TjMzZ8eak) - This Covers More stuff than required. Most Crud operations 😉
- [How to connect firebase to a android application](https://youtu.be/v8GkqTYs6Kg) - (Shorter - Less Content) The orginal tutorial video. Cover basically the samething in this artical 

#### Working Examples
You can see and test the code for yourself to see how it works.
- [SimpleFirebaseApplication](https://bitbucket.org/joshuamckenna/firebaseresearchproject/src/main/SimpleFirebaseApp/) - By [Edwin Ngwa Mfoe](https://www.linkedin.com/in/mfoneedwinngwa/)
- [SoccorJerseyLibrary](https://bitbucket.org/joshuamckenna/firebaseresearchproject/src/main/SoccorJerseyLibrary/) - By Joshua Mckenna

#### Examples For All Crud opertations
- [Cloud Firestore](https://bitbucket.org/joshuamckenna/firebaseresearchproject/src/main/FirbaseApplication/app/src/main/java/ca/joshuamc/firbaseapplication/bo/StudentRepositoryFirestore.java)
- [Realtime](https://bitbucket.org/joshuamckenna/firebaseresearchproject/src/main/FirbaseApplication/app/src/main/java/ca/joshuamc/firbaseapplication/bo/StudentRepositoryRealtime.java)


#### Offical Docs
- Repo to used coded - [https://bitbucket.org/joshuamcke...](https://bitbucket.org/joshuamckenna/firebaseresearchproject/src/main/)
- Firebase console - [https://console.firebase.google.com/](https://console.firebase.google.com/)
- Firebase Docs - [https://firebase.google.com/docs](https://firebase.google.com/docs)
- Firebase Realtime Docs - [https://firebase.google.com/docs/database](https://firebase.google.com/docs/database)
- Firebase Cloud Firestore Docs - [https://firebase.google.com/docs/firestore](https://firebase.google.com/docs/firestore)


