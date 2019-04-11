# Removing Duplicate Records

## The Problem

You might have a teaching section that outputs what appears to be a bunch of duplicated records, like so:

```
FALL 2018
6400 674, Strategic Fin Decision Making.
6400 674, Strategic Fin Decision Making.

SPRING 2018
6400 674, Strategic Fin Decision Making.
6400 674, Strategic Fin Decision Making.

FALL 2017
6400 674, Strategic Fin Decision Making.

SPRING 2017
6400 602, Managerial Finance.

FALL 2016
6400 301, Principles of Finance.
6400 674, Strategic Fin Decision Making.
```

But you'd rather have it look like this:

```
FALL 2018
6400 674, Strategic Fin Decision Making.

SPRING 2018
6400 674, Strategic Fin Decision Making.

FALL 2017
6400 674, Strategic Fin Decision Making.

SPRING 2017
6400 602, Managerial Finance.

FALL 2016
6400 301, Principles of Finance.
6400 674, Strategic Fin Decision Making.
```

At this time this is not achievable with Self-Service Reporting. But, using the new [`showProfile` callback option](cms-usage.md#optional-callback), we can traverse the Document Object Model (DOM) and make it happen.

## A Possible Solution

Each set of records uses a unique class name based on the section it is in. For example, given the scheduled teaching sections shown above, you might have markup like the following:

```html
<ul class="dm-profile-activities-group">
  <li class="dm-profile-activities-group-item">
    <h3 class="dm-profile-heading dm-profile-heading--level-3">
      Fall 2018
    </h3>
    <ol class="dm-profile-activities content--heading8--schTeach1">
      <li class="dm-profile-activity">
        6400 674, Strategic Fin Decision Making.
      </li>
      <li class="dm-profile-activity">
        6400 674, Strategic Fin Decision Making.
      </li>
    </ol>
  </li>
  <li class="dm-profile-activities-group-item">
    <h3 class="dm-profile-heading dm-profile-heading--level-3">
      Spring 2018
    </h3>
    <ol class="dm-profile-activities content--heading8--schTeach1">
      <li class="dm-profile-activity">
        6400 301, Principles of Finance.
      </li>
      <li class="dm-profile-activity">
        6400 674, Strategic Fin Decision Making.
      </li>
    </ol>
  </li>
</ul>
```

Given the `content--heading8--schTeach1` class that identifies these types of record sets, we can use that to check for duplicates. Here is a sample snippet that you might use [after the web profile DOM has been rendered](cms-usage.md#optional-callback).

```javascript
// just a utility function to turn an HTMLCollection into an array so we can
// use Array methods on it
function toArray(htmlcollection) {
  return Array.prototype.slice.call(htmlcollection);
}

/**
 * Updates the DOM to remove duplicate records in a records list.
 *
 * @param {String} parentClassName CSS classname for the parent container
 *   (typically a `ul` or `ol`)
 * @param {String} recordClassName CSS classname for an individual record that
 *   you want to check for duplicate content (typically an `li`)
 */
function dedupeByRecordsSection(parentClassName, recordClassName) {
  // gets all the containers of record sets
  var parents = toArray(document.getElementsByClassName(parentClassName));
  parents.forEach(function(parent) {
    // work with the DOM in a DocumentFragment
    var frag = document.createDocumentFragment();
    // get each of the individual records in a set
    var records = toArray(parent.getElementsByClassName(recordClassName));
    // initialize empty array we'll use to store record text content
    // to check for duplicated records
    var recordTexts = [];
    records.forEach(function(record) {
      // get the cleaned text content of the record
      var text = record.textContent.trim();
      // if that text doesn't already exist in this section...
      if (recordTexts.indexOf(text) === -1) {
        // ... add that text to the `recordsText` array ...
        recordTexts.push(text);
        // ... and append that DOM element to our DocumentFragment
        frag.appendChild(record);
      }
    });
    // clear out the parent record set's HTML
    parent.innerHTML = '';
    // add our DocumentFragment (containing only unique record elements)
    // to our parent record set element
    parent.appendChild(frag);
  });
}

// Record classes are probably going to be the same, so we can make a curried
// version to make this easier
function dedupeByRecordsSectionCurried(recordClassName) {
  return function(parentClassName) {
    dedupeByRecordsSection(parentClassName, recordClassName);
  };
}

// Add the recordClassName of `dm-profile-activity`. Returns a new function
// ready to accept just the record set className.
var dedupeDmProfileActivity = dedupeByRecordsSectionCurried(
  'dm-profile-activity'
);

// you could create an array of all the record set classNames you want to run
// de-duplication on ...
var sectionsToDedupe = [
  'content--heading8--schTeach1',
  'content--heading-12723--12774'
];

// ... then loop through that array and run our curried dedupe function on it.
sectionsToDedupe.forEach(dedupeDmProfileActivity);
```

After running a script like that, given our initial HTML example, we'd get the following in return:

```html
<ul class="dm-profile-activities-group">
  <li class="dm-profile-activities-group-item">
    <h3 class="dm-profile-heading dm-profile-heading--level-3">
      Fall 2018
    </h3>
    <ol class="dm-profile-activities content--heading8--schTeach1">
      <li class="dm-profile-activity">
        6400 674, Strategic Fin Decision Making.
      </li>
      <!-- no second `li.dm-profile-activity` -->
    </ol>
  </li>
  <li class="dm-profile-activities-group-item">
    <h3 class="dm-profile-heading dm-profile-heading--level-3">
      Spring 2018
    </h3>
    <ol class="dm-profile-activities content--heading8--schTeach1">
      <!-- no duplicates in this group, so records stay intact -->
      <li class="dm-profile-activity">
        6400 301, Principles of Finance.
      </li>
      <li class="dm-profile-activity">
        6400 674, Strategic Fin Decision Making.
      </li>
    </ol>
  </li>
</ul>
```

**Note:** This script snippet is one approach to handling and removing duplicate records and may not be the best or right approach for the problem your organization is running into. Please be sure to test thoroughly to make sure it works for your situation!
