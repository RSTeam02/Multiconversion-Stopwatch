define(["../factory/factory","../strategy/convertStrategy","../table/htmlTable","../converter/romanConverter","../mvc/stopper", "../converter/binaryConverter", "../mvc/view", "../mvc/controller"], function () {
    
    new Controller(new Stopper());
});
