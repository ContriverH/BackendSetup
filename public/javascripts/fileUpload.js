const rootStyles = window.getComputedStyle(document.documentElement); // this is going to get all the styles inside of the root tag of the main.css. This is needed as after loading fileUpload.js the css files will not load again

if (
  rootStyles.getPropertyValue("--book-cover-width-large") != null &&
  rootStyles.getPropertyValue("--book-cover-width-large") !== ""
) {
  ready();
} else {
  document.getElementById("main-css").addEventListener("load", ready); // in case the rootStyles is not loaded, we will get it by giving id to the css file in layout.ejs
}

function ready() {
  const coverWidth = parseFloat(
    rootStyles.getPropertyValue("--book-cover-width-large")
  );
  const coverAspectRatio = parseFloat(
    rootStyles.getPropertyValue("--book-cover-aspect-ratio")
  );
  const coverHeight = coverWidth / coverAspectRatio;

  FilePond.registerPlugin(
    // for every plugin we included in the project we need to integrate it with our project. These names can be found on the filpong plugin page.
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode
  );

  FilePond.setOptions({
    stylePanelAspectRatio: 1 / coverAspectRatio,
    imageResizeTargetWidth: coverWidth, // this will not let the image size to exceed more than this target value.
    imageResizeTargetHeight: coverHeight,
  });

  FilePond.parse(document.body); // this is going to covert all our inputs into filepond inputs
}
