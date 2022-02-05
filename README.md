## Main Functionalities

This project was created to help detect all third party extensions in a Magento 2.x installation.

All detected third party extensions are shown in the results window with the possibility of dividing into enabled and disabled,

## How to use

This project is hosted on Github Pages, so you don't need to download it to use it.
The detector is available at the [link](https://dathard.github.io/third-party-extensions-detector/) (https://dathard.github.io/third-party-extensions-detector/)

The detector looks like this:
![Сleaning log files section](https://github.com/Dathard/images-in-readme/blob/main/Magento2/ThirdPartyExtensionsDetector/HomePage.png?raw=true)

For a more efficient check, in the `"Magento Version"` field, select the version which you want to check, for example 2.3.6.

In the `"Code with config.php"` field, enter the contents of the `app/etc/config.php` file from Magento. Based on the information from this file, a check will be made.

The test results will be filtered and displayed as follows:
![Сleaning log files section](https://github.com/Dathard/images-in-readme/blob/main/Magento2/ThirdPartyExtensionsDetector/ResultsPage.png?raw=true)
