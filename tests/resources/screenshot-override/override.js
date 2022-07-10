$(document).ready(function () {

    function updateSystemCheck() {
        $('.system-check tr:contains(Time) td:nth-child(2)').text('Not showing in tests');
        $('.system-check tr:contains(Datetime) td:nth-child(2)').text('Not showing in tests');
        $('.system-check tr:contains(Version) td:nth-child(2)').text('Not showing in tests');
        $('.system-check tr:contains(User Agent) td:nth-child(2)').text('Not showing in tests');
    }

    var nextTick = window.Vue.nextTick;
    nextTick(function () {
        updateSystemCheck();

        if (window.piwikHelper) {
            nextTick(function () {
                // because of angular rendering replacing the content potentially...
                updateSystemCheck();
                nextTick(function () {
                    updateSystemCheck();
                });
            });
        }

        $('.ui-inline-help:contains(UTC time is)').hide();

        $('[notification-id=ControllerAdmin_HttpIsUsed]').hide();

        $.fx.off = true;

        // disable materialize animations (Materialize version > 1)
        if (typeof M !== 'undefined' && M.anime) {
            var oldAnime = M.anime;
            M.anime = function (params) {
                if (!params) {
                    params = {};
                }
                params.duration = 0;
                return oldAnime(params);
            };
        } else if ($.Velocity) {
            $.Velocity.mock = true;
        }
    });
});
