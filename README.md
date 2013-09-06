Tocca.js
========

Super lightweight script (1kb) to detect via Javascript events like 'tap' 'dbltap' 'swipeup'  'swipedown'  'swipeleft'  'swiperight' on any kind of device.

usage:
<pre lang="javascript">
elm.addeventListener('tap',function(e){});
elm.addeventListener('dbltap',function(e){});
elm.addeventListener('swipeleft',function(e){});
elm.addeventListener('swiperight',function(e){});
elm.addeventListener('swipeup',function(e){});
elm.addeventListener('swipedown',function(e){});
</pre>

It works with jQuery as well:
<pre lang="javascript">
$(elm).on('tap',function(e){});
$(elm).on('dbltap',function(e){});
$(elm).on('swipeleft',function(e){});
$(elm).on('swiperight',function(e){});
$(elm).on('swipeup',function(e){});
$(elm).on('swipedown',function(e){});
</pre>

