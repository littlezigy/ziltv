// auto reload
// setTimeout("location.reload(true);", 10000);

import "./unit/index.js"
import "./integration/index.js"
import "./e2e/index.js"

mocha.checkLeaks();
mocha.run();
