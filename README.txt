# README

Author: Josh Cohen <joshco@gmail.com>

## Instructions:
Put these files anywhere you can access them with a web browser.  I personally use
> python -m SimpleHTTPServer

I use ngrok tunneling for mobile testing

## V2 Fixes
sort ascending instead of descending (show oldest events first)
properly iterate over multiple addresses
changed sample data for the first event "Milford Phone Bank" to have multiple locations, multiple shifts and multiple tiers to check app compat
added toggle details text link
fix date formatting for mobile
make "attend" button change text after attend

Code delta can be seen here: https://github.com/joshco/hfaevents/compare/allowed_time...gh-pages
(Original version is tagged 'allowed_time' for comparison)

Live code runs at: http://joshco.github.io/hfaevents/

## Notes
I included the extra credit using local storage to save attendance state.

FYI, I looked at the live events json API on hillaryclinton.com.  I notice that the events list includes the contact name and
phone number.  That seems ripe for abuse.  I could easily create "Donald Trips Virtual Evildoer" app which lists out the hillary
staff/organizers and call buttons to harass them.  This would be completely anonymous and doesn't first require an RSVP or any
identification.

