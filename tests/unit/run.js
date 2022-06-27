// auto reload
setTimeout("location.reload(true);", 10000);

mocha.checkLeaks();
mocha.run();
