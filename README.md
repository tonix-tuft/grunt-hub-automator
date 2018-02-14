# Grunt Hub Automator

A Grunt Hub suitable to run as a daemon which helps executing tasks on multiple Grunt projects.

## What can you use it for?

You can use a Grunt Hub Automator to automate the build of your projects (your projects' Gruntfile.js files should have [watch tasks](https://github.com/gruntjs/grunt-contrib-watch) defined).

## Prerequisites

The only prerequisite is to have `npm` installed. You should already have it if you use `Grunt`. If so, skip directly to the *Getting Started* section.

If you don't have `npm`, take a look at the [NPM's installation guide](https://www.npmjs.com/get-npm).

Basically, all you need to do is to install `node` (which will install `npm` too) and then issue the following command to update `npm` to the
latest version:

```
$ npm install npm@latest -g
```

**NOTE**: if you are using OS X, you may need to prefix the command with `sudo`, therefore:

```
$ sudo npm install npm@latest -g
```

## Getting Started

When you are done with the *Prerequisites* section, clone the repository on your local machine, enter it and launch the `npm install` command:

```
$ git clone https://github.com/tonix-tuft/grunt-hub-automator
$ cd grunt-hub-automator
$ npm install
```

Now you can set up your Grunt Hub Automator.

## Set Up

The following steps must be done:

- Creating a new Gruntfile.js from the sample file provided with this repo (**Gruntfile.sample.js**);
- Creating a new "daemonizing" script from the sample file provided with this repo (**grunt-hub-automator.sample**);

### Gruntfile.sample.js

Copy this file and save it as *Gruntfile.js* in the same directory. Open *Gruntfile.js*, and replace the `src` property with the paths to the Grunt files of your projects:

```
  ...
  grunt.initConfig({
    hub: {
      all: {
        src: ['/path/to/*/Gruntfile.js'] <--- Replace this path with the path to your Grunt file or with the paths to your Grunt files if you have many projects.
  ...
```

The idea is that every user who has cloned this repo has its own Grunt Hub Automator's Gruntfile.js file, which will act as a configuration for the Grunt Hub Automator.
The Grunt Hub Automator will then run as a daemon and use this configuration to search for specific Gruntfile.js files to load.

### grunt-hub-automator.sample

The last step is to set up the daemon which will run the Grunt Hub Automator. Copy the script *grunt-hub-automator.sample*
and save it as *grunt-hub-automator*.

The default "daemonizing" tool used by Grunt Hub Automator is the `daemon` command, which you can be found both on Linux and on OS X.
The file contains several variables needed to configure the command which you may edit if you need.

Otherwise, all you need to do is to install the `daemon` command and register the `grunt-hub-automator` script as a service.

Below the instructions depending on your platform.

**NOTE**: The sample script `grunt-hub-automator.sample` references the "daemonizing" command through this line:

```
...
DAEMONIZE_COMMAND=/usr/local/bin/daemon # The absolute path to your "daemonizing" command.
...
```

You must edit this path accordingly and specify the absolute path to the `daemon` command if you already have it installed or
as do it soon as you install the `daemon` command for your plaform (below). To find out the absolute path of the `daemon` command,
use the following command:

```
$ which daemon
```

#### Linux

Install the `daemon` command using your package manager, e.g. for Ubuntu:

```
$ sudo apt-get install daemon
```

Then assure that the following line within `grunt-hub-automator` points to the **full path** to your `daemon` command:

```
...
DAEMONIZE_COMMAND=/usr/local/bin/daemon # The absolute path to your "daemonizing" command.
...
```

After the daemon command is installed, to assure that the script is executed when your machine boots,
edit the file `/etc/rc.local` with root privileges and add the following line before the last one (`exit 0`):

```
...
/Must/Be/An/Absolute/Path/To/Your/grunt-hub-automator/grunt-hub-automator || exit 1 # <--- The line to add
exit 0 # <--- Last line of /etc/rc.local
```

Note that the path to the `grunt-hub-automator` script **must be absolute**.

You can then reboot your machine and the daemon should start.
To stop it programmatically use the provided command `stop-linux`:

```
$ cp ./stop-linux.sample ./stop-linux
$ chmod +x ./stop-linux
$ ./stop-linux
```

You can also copy the `start-linux.sample` script and save it as `start-linux`, but you must
specify the path to the `grunt-hub-automator` script (it **must be an absolute path**).

Then you can use the `start-linux` script to start the Grunt Hub Automator programmatically:

```
$ ./start-linux
```

#### OS X

To install the `daemon` command, you can use [brew](https://brew.sh/index.html):

```
$ brew install daemon
```

After the daemon command is installed, create a launch agent:

- Copy the sample `com.grunt.hub.automator.plist.sample` in the current folder and save it with
the name `com.grunt.hub.automator.plist`;

- Open the new file and edit the following line so that it points to your `grunt-hub-automator` script (**it must be an absolute path**):

```
...
<string>/Must/Be/An/Absolute/Path/To/Your/grunt-hub-automator/grunt-hub-automator</string>`
...
```

- Move the file to `/Library/LaunchAgents/`:

```
$ sudo mv ./com.grunt.hub.automator.plist /Library/LaunchAgents/
```

Load and start the new created agent so that it runs automatically when you boot your machine:

```
$ launchctl load -w /Library/LaunchAgents/com.grunt.hub.automator.plist
```

This command is the same as running the provided script `start-os-x` (which you can create by copying `start-os-x.sample`and saving it as `start-os-x`,
making it executable):

```
$ cp ./start-os-x.sample ./start-os-x
$ chmod +x ./start-os-x
$ ./start-os-x
```

If you ever need to stop the daemon programmatically, use the provided script named `stop-os-x.sample` to create a script named `stop-os-x`:

```
$ cp ./stop-os-x.sample ./stop-os-x
$ chmod +x ./stop-os-x
$ ./stop-os-x
```

### After you run the daemon

After you launch the daemon on your system you can see a log file with a path name similar to `/tmp/grunt-hub-automator.tmp.CY0h1P7b.log`.
Please keep in mind that this file will be recreated from scratch each time you restart the daemon.
If this is not what you want, edit the `grunt-hub-automator` script.

## Acknowledgements

[shama/grunt-hub](https://github.com/shama/grunt-hub) - grunt-hub

## Authors

**Tonix-Tuft**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
