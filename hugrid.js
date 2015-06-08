/*
* Heads-Up Grid
* Simple HTML + CSS grid overlay for web design and development.
*
* Files: hugrid.css, hugrid.js
*
* Based on Heads-Up Grid here:
* http://bohemianalps.com/tools/grid
* https://github.com/simanek/Heads-Up-Grid
* Copyright (c) 2011 Jason Simanek
*
* Modified by: Rob Anderson @iotaweb
* https://github.com/iotaweb/heads-up-grid
* Changes: refactored as more standard jQuery plugin
* Version: 2.0
*
* Licensed under the GPL license: http://www.gnu.org/licenses/gpl.html
*/
/* global console */
/* jshint unused:false */
(function ($) {

    'use strict';

    $.fn.HUG = function (options) {

        var defaults = {
            pageUnits:          'px',
            colUnits:           'px',
            gridOnLoad:         'off',
            pageWidth:          960,
            columns:            6,
            columnWidth:        140,
            gutterWidth:        24,
            pageTopMargin:      35,
            rowHeight:          20
        };

        var settings = $.extend(defaults, options);
        var plugin = {
            init: init,
            state: settings.gridOnLoad
        };

        return plugin;

        ////////////////////////////////////////

        function init () {

            makeHUGrid();
            setGridOnLoad();
        }

    	function toggleState () {

            // change our indicators of state
            if (plugin.state === 'on') {
                plugin.state = 'off';
            } else if (plugin.state === 'off') {
                plugin.state = 'on';
            }
        }

        function makeHUGrid () {

            $('#hugrid').remove();
            $('#hugridRows').remove();
            $('#hugridUX').remove();

            // Column Container
            var hugridDiv = document.createElement('div');
            hugridDiv.id  = 'hugrid';

            // Left Margin Column
            var leftDiv = document.createElement('div');
            leftDiv.className = 'mline mlineL';

            hugridDiv.appendChild(leftDiv);

            // Create Columns
            for (var i = 0; i < (settings.columns - 1); i += 1) {

                var colDiv = document.createElement('div');
                colDiv.className = 'hugcol';
                hugridDiv.appendChild(colDiv);

                var lineLDiv = document.createElement('div');
                lineLDiv.className = 'lineL';
                colDiv.appendChild(lineLDiv);

                var lineRDiv = document.createElement('div');
                lineRDiv.className = 'lineR';
                colDiv.appendChild(lineRDiv);
            }

            // Right Margin Column
            var rightDiv = document.createElement('div');

            rightDiv.className = 'mline mlineR';
            hugridDiv.appendChild(rightDiv);

            document.body.appendChild(hugridDiv);

            // If Rows
            if (settings.rowHeight !== 0)  {
                // Row Container
                if ($(window).height() > $(document.body).height()) {
                    settings.pageHeight = $(window).height();
                } else {
                    settings.pageHeight = $(document.body).height();
                }

                var hugridRows = document.createElement('div');
                hugridRows.id  = 'hugridRows';

                // Create Rows
                for (i = 0; i < (settings.pageHeight / settings.rowHeight); i += 1) {
                    var rowDiv = document.createElement('div');
                    rowDiv.className = 'hugrow';
                    hugridRows.appendChild(rowDiv);

                    var lineB = document.createElement('div');
                    lineB.className = 'lineB';
                    rowDiv.appendChild(lineB);
                }

                document.body.appendChild(hugridRows);
            }

            // Apply CSS Properties
            $('#hugrid').css('width', settings.pageWidth + settings.pageUnits);

            if (typeof settings.pageLeftMargin === 'number') {
                $('#hugrid')
                    .css('left', settings.pageLeftMargin + settings.pageUnits)
                    .css('margin', '0');
            } else if (typeof settings.pageRightMargin === 'number') {
                $('#hugrid')
                    .css('right', settings.pageRightMargin + settings.pageUnits)
                    .css('left', 'auto')
                    .css('margin', '0');
            } else {
                if (settings.pageUnits === '%') {
                    $('#hugrid')
                        .css('left', ((100 - settings.pageWidth) / 2) + settings.pageUnits)
                        .css('margin-left', 'auto');
                } else {
                    $('#hugrid')
                        .css('margin-left', '-' + (settings.pageWidth / 2) + settings.pageUnits);
                }
            }

            $('#hugrid div.hugcol')
                .css('margin-left', settings.columnWidth + settings.colUnits)
                .css('width', settings.gutterWidth + settings.colUnits);
            $('#hugridRows').css('margin-top', settings.pageTopMargin + 'px');
            $('#hugridRows div.hugrow').css('margin-top', (settings.rowHeight - 1) + 'px');

            /* Create hugridUX and button */
            var hugridUX = document.createElement('div');
            hugridUX.id = 'hugridUX';
            document.body.appendChild(hugridUX);

            $('#hugridUX').append('<div id="hugridButtonBkgd">' +
                '</div><button id="hugridButton"></button>');

            $('#hugridButton')
                .append('<span id="hugbuttonON">ON</span>')
                .append('<span id="hugbuttonOFF" style="display:none;">OFF</span>');

            /* On/Off Button - click functionality */
            $('#hugridButton').click(function () {
                $('#hugridButton').toggleClass('buttonisoff') ;
                $('#hugrid').toggle();
                $('#hugridRows').toggle();
                $('#hugridButton span').toggle();
                toggleState();
            });
        }

        function setGridOnLoad () {

            if (typeof settings.gridOnLoad === 'undefined' || settings.gridOnLoad === 'off') {
                $('#hugridButton').toggleClass('buttonisoff') ;
                $('#hugrid').toggle();
                $('#hugridRows').toggle();
                $('#hugridButton span').toggle();
                plugin.state = 'off';
            } else {
                plugin.state = 'on';
            }
        }

        function setGridOnResize () {

            if (plugin.state === 'off') {
                $('#hugridButton').toggleClass('buttonisoff') ;
                $('#hugrid').toggle();
                $('#hugridRows').toggle();
                $('#hugridButton span').toggle();
            }
        }
    };
}(jQuery));
