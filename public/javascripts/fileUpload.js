FilePond.registerPlugin(
  // for every plugin we included in the project we need to integrate it with our project. These names can be found on the filpong plugin page.
  FilePondPluginImagePreview,
  FilePondPluginImageResize,
  FilePondPluginFileEncode
);

FilePond.setOptions({
  stylePanelAspectRatio: 150 / 100,
  imageResizeTargetWidth: 100, // this will not let the image size to exceed more than this target value.
  imageResizeTargetHeight: 150,
});

FilePond.parse(document.body); // this is going to covert all our inputs into filepond inputs
