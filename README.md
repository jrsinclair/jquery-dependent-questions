# Dependent Questions jQuery Plugin

**Make a form question's visibility dependent on some other question simply by adding `data-depends-on="inputName=value"` to your wrapper HTML element. No other code required.**

This plugin allows you to specify that a particular form question should only be
made visible if the answer to a previous question is a specific value. It does this
by making use of HTML5 data attributes. For example:

`````html
<form action="?" id="myform">
  <fieldset class="form-question">
    <legend>Would you like to see another question?</legend>
    <span>
      <input type="radio" name="more" value="no" id="more-no"/>
      <label for="more-no">No</label>
    </span>
    <span>
      <input type="radio" name="more" value="yes" id="more-yes"/>
      <label for="more-yes">Yes</label>
    </span>
  </fieldset>
  <fieldset data-depends-on="more=yes">
    <div class="form-question">
      <label for="extra">What else would you like to add?</label>
      <input type="text" name="extra" id="extra"/>
      </div>
  </fieldset>
</form>
`````

In the above example, the question "What else would you like to add?" would only be
displayed when the first question is answered as "yes".

Note that the `data-depends-on` attribute refers to the form input **name**, not an ID.

To use plugin, add something like the following to your web page:

`````html
<script src="http://code.jquery.com/jquery.min.js"></script>
<script src="jquery.dependent-questions.js"></script>
<script>
  $('#myform').dependentQuestions();
</script>
`````
## Options

You can specify how the dependent questions are revealed by passing options to the plugin constructor. For example, if you would like the questions to fade in, rather than slide down, you could specify something like the following:

`````javascript
$("myform").dependentQuestions({
    effect: "fade",    // This can be 'fade' or 'slide'
    duration: "slow"   // This can be 'slow', 'fast', or a number of milliseconds
});
`````

## Thanks

Development of this plugin was supported by [Squiz](http://squiz.com.au).
