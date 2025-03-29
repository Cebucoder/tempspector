$(document).ready(function () {
    let iframe = $('#web_previer');
    let temp_executer = $('#temp_executer');
    let temp_px_label = $('#temp_px_label'); // Label for screen size
    let loadingIndicator = $('#loadingIndicator'); // Loading effect element

    // Screen size data
    const screenSizes = [
        { label: "Small Android Phones", width: 360, height: 640 },
        { label: "iPhone SE", width: 375, height: 667 },
        { label: "iPhone 15, 14, 13, 12", width: 390, height: 844 },
        { label: "iPhone 11, XR, Plus Models", width: 414, height: 896 },
        { label: "iPhone 15 Pro Max, 14 Pro Max", width: 430, height: 932 },
        { label: "Large Android Phones", width: 480, height: 854 },
        { label: "Small Android Tablets", width: 600, height: 960 },
        { label: "iPad Mini, Standard 9.7-inch Tablets", width: 768, height: 1024 },
        { label: "iPad Air", width: 810, height: 1080 },
        { label: "iPad Pro 11-inch", width: 834, height: 1194 },
        { label: "iPad Pro 12.9-inch", width: 1024, height: 1366 },
        { label: "HD, small laptops", width: 1280, height: 720 },
        { label: "Most common low-end laptops", width: 1366, height: 768 },
        { label: "MacBook, Mid-size Laptops", width: 1400, height: 900 } // Default size
    ];

    // Get saved screen size from localStorage, otherwise use default (1400x900)
    let savedSize = localStorage.getItem("selectedScreenSize") || "1400x900";
    let [savedWidth, savedHeight] = savedSize.split("x").map(Number);
    let savedSizeData = screenSizes.find(size => `${size.width}x${size.height}` === savedSize) || screenSizes[screenSizes.length - 1];

    // Apply saved/default screen size
    iframe.css({ width: savedWidth + 'px', height: savedHeight + 'px' });

    // Update dropdown and label
    $('#screenSize').val(savedSize);


    // Change iframe size and label when user selects a different screen size
    $('#screenSize').change(function () {
        let selectedValue = $(this).val();
        let selectedSize = screenSizes.find(size => `${size.width}x${size.height}` === selectedValue);


        if (selectedSize) {
            iframe.css({ width: selectedSize.width + 'px', height: selectedSize.height + 'px' });
            temp_px_label.text(`${selectedSize.label} - ${selectedSize.width} × ${selectedSize.height} px`);
            localStorage.setItem("selectedScreenSize", selectedValue);
            let selectedScreenWidth = `${selectedSize.width}`;
            localStorage.setItem("selectedScreenWidth", selectedScreenWidth);
            let savedScrenWidth = localStorage.getItem("selectedScreenWidth");
            let savedScreenWidthAdd = parseInt(savedScrenWidth, 10) + 50;
            $('.temp_previewer').css('width', `${savedScreenWidthAdd}px`);

        }

        if (selectedSize.width >= 1280) {
            $('.touch_con').hide();
            $('.temp_previewer').addClass("ad_pd_btm");
            console.log("Greater than or equal to 1280");
        } else {
            $('.touch_con').show();
            $('.temp_previewer').removeClass("ad_pd_btm");
            console.log("Less than 1280");
        }

        // $('.temp_previewer').addClass("bounce");
        // setTimeout(() => {
        //     $('.temp_previewer').removeClass("bounce");
        // }, 800);
        $('.temp_previewer').hide().fadeIn(500);

    });



    // Retrieve saved link from localStorage and load it
    let savedLink = localStorage.getItem("PreviewLink");
    if (savedLink) {
        $('#temp_link_rdr').val(savedLink);

        setTimeout(() => temp_executer.trigger('click'), 500); // Delay auto-trigger to avoid looping
    }

    // Show loading effect while fetching the preview
    temp_executer.on('click', function (event) {
        event.preventDefault();
        // Save input link to localStorage
        let temp_link_rdr = $('#temp_link_rdr').val().trim(); // Get the input value
        if (!temp_link_rdr) return; // Stop if input is empty

        // Save input link
        localStorage.setItem("PreviewLink", temp_link_rdr);

        let savedScrenWidth = localStorage.getItem("selectedScreenWidth");
        let savedScreenWidthAdd = parseInt(savedScrenWidth, 10) + 50;
        $('.temp_previewer').css('width', `${savedScreenWidthAdd}px`);
        $('.temp_previewer').hide().fadeIn(500);

        if (savedScrenWidth >= 1280) {
            $('.touch_con').hide();
            $('.temp_previewer').addClass("ad_pd_btm");
            console.log("Greater than or equal to 1280");
        } else {
            $('.touch_con').show();
            $('.temp_previewer').removeClass("ad_pd_btm");
            console.log("Less than 1280");
        }

        loadingIndicator.css("display", "block"); // Show loading effect
        iframe.css(
            {
                visibility: "hidden",
                display: "none",
                // width: "1400px",
            }); // Hide iframe temporarily

        iframe.attr('src', temp_link_rdr); // Set iframe src

        // Wait until iframe loads completely
        iframe.on('load', function () {
            loadingIndicator.css("display", "none"); // Hide loading effect
            iframe.css(
                {
                    visibility: "visible",
                    display: "block",
                    // maxWidth: "1400px",
                }
            ); // Show iframe again
            temp_px_label.text(`${savedSizeData.label} - ${savedWidth} × ${savedHeight} px`);
        });
    });
});
