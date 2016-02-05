var intentExports = {}
var intentHandlers = []

intentExports.setNewIntentHandler = function (handler, errorCallback) {
    //argscheck.checkArgs('fF', 'plugin.setNewIntentHandler', arguments);
    intentHandlers.push(handler)

    setTimeout(function() {
        var dummyIntent = window.intent.dummy;

    }, 2000)
}

intentExports.getCordovaIntent = function (handler) {

}

/**
 * FOR TESTING
 * Call each of the intent handlers with the supplied intent
 * @param  {Object} intent An intent, like sharing files
 */
intentExports.triggerIntent = function (intent) {
    intentHandlers.forEach(function(ih) {
        ih(intent)
    })
}

/**
 * FOR TESTING
 * Add a project file to local file storage powered by the
 * HTML5 File API by downloading it from the webservice that is
 * serving the project files.
 * @param {string} filename Name of the file
 * @param {function} success  Success
 * @param {function} failure  Failure
 */
intentExports.addLocalFileToFileStorage = function (filename, success, failure) {
    var fileTransfer = new FileTransfer();
    var fileUrl = 'cdvfile://localhost/temporary/' + filename
    fileTransfer.download(cordova.file.applicationDirectory + filename, fileUrl, success, failure, true)
}

// intentExports.addLocalFileToFileStorage = function (filename, success, failure) {
//     var fileTransfer = new FileTransfer();
//     var fileUrl = 'cdvfile://localhost/temporary/' + filename
//
//     var onInitFS = function (dir) {
//       fs.getFile(filename, {create: true}, function(fileEntry) {
//
//
//
//         // // Create a FileWriter object for our FileEntry (log.txt).
//         // fileEntry.createWriter(function(fileWriter) {
//         //
//         //   fileWriter.onwriteend = success
//         //   fileWriter.onerror = failure
//         //
//         //   // Create a new Blob and write it to log.txt.
//         //   var blob = new Blob(['Lorem Ipsum'], {type: 'text/plain'});
//         //
//         //   fileWriter.write(blob);
//         //
//         // }, failure);
//
//       }, failure);
//
//     }
//     //window.resolveLocalFileSystemURL("filesystem:" + cordova.file.applicationDirectory + 'temporary/', onInitFS, failure);
// }

module.exports = intentExports

// Make plugin work under window.plugins
if (!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.intent) {
    window.plugins.intent = intentExports;
}

require("cordova/exec/proxy").add("IntentHandler", module.exports);
