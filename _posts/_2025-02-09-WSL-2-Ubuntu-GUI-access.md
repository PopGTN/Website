---
layout: tocPost
title: Wsl 2 Ubuntu Gnome/XFCE4 GUI Acccess
header: false
author: Joshua Mckenna


toc:
  - "Step 1: Setting Up WSL2 with Ubuntu on Windows"
  - "Step 2: Install XFCE4 or Ubuntu Desktop Gnome"
  - "Step 2-1:"  
---

This post will cover how to gain access to ubuntu gnome or XFCE4 GUI. This wont use xrdp. It will use x server which i find to be more
stable. I figured I make a post to inform anyone else try to obtaining  the same goal. I tryed many different methods. But
none didn't work well. So with a little bit of research and combing many different methods into one. I came up with my
own solution to the problem

## Step 1: Setting Up WSL2 with Ubuntu on Windows

This guide will walk you through the steps to install and set up Ubuntu on Windows Subsystem for Linux 2 (WSL2).

### Prerequisites

Before proceeding with the setup, ensure that your system meets the following requirements:

- **Windows 10 version 1903 or higher (Build 18362 or higher)**.
- **Virtualization must be enabled** in your BIOS.

#### Enable Windows Subsystem for Linux

1. Open **PowerShell** as Administrator. Right-click the Start menu and select **Windows PowerShell (Admin)**.
2. Run the following command to enable the WSL feature:
```powershell
   dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
```

## Step 2: Install XFCE4 or Ubuntu Desktop Gnome



### Step 2-1:
First of all we need to make sure to have everything up to date so this is the command we are going to run in the wsl 
terminal

#### Option 1: XFCE4
Inside your WSL terminal (Ubuntu), update packages:

```
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
```


sudo apt install x11-apps -y

Then, install **XFCE4** and additional goodies:


{% highlight json linenos %}
```json
    {
    "firstName": "John",
    "lastName": "Smith",
    "age": 25
    }
```
{% endhighlight %}

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Page Title</title>
    </head>
    <body>
    
        <h1>My First Heading</h1>
        <p>My first paragraph.</p>
    
    </body>
</html>

```

This command will install xfce4 and its extra apps 

```bash
    sudo apt install xfce4 xfce4-goodies -y
```
> (Optional) Install a lightweight window manager:

```bash 
    sudo apt install dbus-x11 -y
```

```json
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
```
## 


{% highlight ruby linenos %}
def foo
puts 'foo'
end
{% endhighlight %}