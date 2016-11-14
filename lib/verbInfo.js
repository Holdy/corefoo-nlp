var verbMap = {};

function newVerb() {
    var verb = {
        canBeAdjective: false
    };
    var target = '';

    return {
        'to': function(word) {
            verb.to = word;
            return this;
        },
        'theActor': function() {
            target = 'theActor';
            return this;
        },
        'theObject': function() {
            target = 'theObject';
            return this;
        },
        'once': function(word) {
            verb.actorOnce = word;
            verbMap[word] = verb;
            return this;
        },
        'canBeAdjective': function() {
            verb.canBeAdjective = true;
            return this;
        },
        'was': function(word) {
            if (target === 'theActor') {
                verb.actorWas = word;
            } else if (target === 'theObject') {
                verb.objectWas = word;
            } else {
                throw new Error('Target unknown for [was]');
            }
            verbMap[word] = verb;
            return this;
        },
        'has': function(word) {
            verb.actorHas = word;
            verbMap[word] = verb;
            return this;
        },
        'is': function(word) {
            verb.actorIs = word;
            verbMap[word] = verb;
            return this;
        },
        'currently': function(word) {
            verb.actorCurrently = word;
            verbMap[word] = verb;
            return this;
        },
        'will': function(word) {
            verb.actorWill = word;
            verbMap[word] = verb;
            return this;
        },
        'isBeing': function(word) {
            verb.objectIsBeing = word;
            verbMap[word] = verb;
            return this;
        },
        'willBe': function(word) {
            verb.objectWillBe = word;
            verbMap[word] = verb;
            return this;
        }
    };
}

newVerb().to('go').theActor().once('went').was('going').has('gone').is('going').currently('goes').will('go');

newVerb().to('come').theActor().once('came').was('coming').has('come').is('coming').currently('comes').will('come');


newVerb().to('allow').theActor().once('allowed').has('allowed').is('allowing').currently('allows').will('allow')
    .theObject().was('allowed').isBeing('allowed').willBe('allowed');

newVerb().to('improve').theActor().once('improved').has('improved').is('improving').currently('improves').will('improve')
    .theObject().was('improved').isBeing('improved').willBe('improved');

newVerb().to('visit').theActor().once('visited').has('visited').is('visiting').currently('visits').will('visit')
    .theObject().was('visited').isBeing('visited').willBe('visited');


newVerb().to('protect').theActor().once('protected').has('protected').is('protecting').currently('protects').will('protect')
    .theObject().was('protected').isBeing('protected').willBe('protected');


newVerb().to('delay').theActor().once('delayed').has('delayed').is('delaying').currently('delays').will('delay')
    .theObject().was('delayed').isBeing('delayed').willBe('delayed');



newVerb().to('cause').theActor().once('caused').has('caused').is('causing').currently('causes').will('cause')
    .theObject().was('caused').isBeing('caused').willBe('caused');

newVerb().to('trigger').theActor().once('triggered').has('triggered').is('triggering').currently('triggers').will('trigger')
    .theObject().was('triggered').isBeing('triggered').willBe('triggered');


newVerb().to('eat').theActor().once('ate').has('eaten').is('eating').currently('eats').will('eat')
    .theObject().was('eaten').isBeing('eaten').willBe('eaten');

newVerb().to('drink').theActor().once('drank').has('drunk').is('drinking').currently('drinks').will('drink')
    .theObject().was('drunk').isBeing('drunk').willBe('drunk');


newVerb().to('have').theActor().once('had').was('having').has('had').is('having').currently('has').will('have');

newVerb().to('speak').theActor().once('spoke').was('speaking').has('spoken').is('speaking').currently('speaks').will('speak');


newVerb().to('say').theActor().once('said').was('saying').has('said').is('saying').currently('says').will('say');

newVerb().to('make').theActor().once('made').has('made').is('making').currently('makes').will('make')
    .theObject().was('made').isBeing('made').willBe('made');

newVerb().to('refuse').theActor().once('refused').has('refused').is('refusing').currently('refuses').will('refuse')
    .theObject().was('refused').isBeing('refused').willBe('refused');

newVerb().to('refer').theActor().once('referred').has('referred').is('referring').currently('refers').will('refer')
    .theObject().was('referred').isBeing('referred').willBe('referred');


newVerb().to('get').theActor().once('got').has('gotten').is('getting').currently('gets').will('get')
    .theObject().was('got').isBeing('gotten').willBe('gotten');

newVerb().to('prefer').theActor().once('preferred').has('preferred').is('preferring').currently('prefers').will('prefer')
    .theObject().was('preferred').isBeing('preferred').willBe('preferred').canBeAdjective();

newVerb().to('favour').theActor().once('favoured').has('favoured').is('favouring').currently('favours').will('favour')
    .theObject().was('favoured').isBeing('favoured').willBe('favoured').canBeAdjective();


newVerb().to('know').theActor().once('knew').has('known').is('knowing').currently('knows').will('know')
    .theObject().was('known').isBeing('known').willBe('known');

newVerb().to('show').theActor().once('showed').has('shown').is('showing').currently('shows').will('show')
    .theObject().was('shown').isBeing('shown').willBe('shown');

newVerb().to('map').theActor().once('mapped').has('mapped').is('mapping').currently('maps').will('map')
    .theObject().was('mapped').isBeing('mapped').willBe('mapped');


newVerb().to('think').theActor().once('thought').has('thought').is('thinking').currently('thinks').will('think')
    .theObject().was('thought').isBeing('thought').willBe('though');

newVerb().to('take').theActor().once('took').has('taken').is('taking').currently('takes').will('take')
    .theObject().was('taken').isBeing('taken').willBe('taken');

newVerb().to('see').theActor().once('saw').has('seen').is('seeing').currently('sees').will('see')
    .theObject().was('seen').isBeing('seen').willBe('seen');

newVerb().to('monitor').theActor().once('monitored').has('monitored').is('monitoring').currently('monitors').will('monitor')
    .theObject().was('monitored').isBeing('monitored').willBe('monitored');

newVerb().to('come').theActor().once('came').has('come').is('coming').currently('comes').will('come');

newVerb().to('control').theActor().once('controlled').has('controlled').is('controlling').currently('controls').will('control')
    .theObject().was('controlled').isBeing('controlled').willBe('controlled');

newVerb().to('like').theActor().once('liked').has('liked').is('liking').currently('likes').will('like')
    .theObject().was('liked').isBeing('liked').willBe('liked');

newVerb().to('hate').theActor().once('hated').has('hated').is('hating').currently('hates').will('hate')
    .theObject().was('hated').isBeing('hated').willBe('hated');

newVerb().to('commit').theActor().once('committed').has('committed').is('committing').currently('commits').will('commit')
    .theObject().was('committed').isBeing('committed').willBe('committed');

newVerb().to('own').theActor().once('owned').has('owned').is('owning').currently('owns').will('own')
    .theObject().was('owned').isBeing('owned').willBe('owned');

newVerb().to('connect').theActor().once('connected').has('connected').is('connecting').currently('connects').will('connect')
    .theObject().was('connected').isBeing('connected').willBe('connected');

newVerb().to('find').theActor().once('found').has('found').is('finding').currently('finds').will('find')
    .theObject().was('found').isBeing('found').willBe('found');

newVerb().to('give').theActor().once('gave').has('given').is('giving').currently('gives').will('give')
    .theObject().was('given').isBeing('given').willBe('given');

newVerb().to('tell').theActor().once('told').has('told').is('telling').currently('tells').will('tell')
    .theObject().was('told').isBeing('told').willBe('told');

newVerb().to('work').theActor().once('worked').has('worked').is('working').currently('works').will('work')
    .theObject().was('worked').isBeing('worked').willBe('worked');

newVerb().to('call').theActor().once('called').has('called').is('calling').currently('calls').will('call')
    .theObject().was('called').isBeing('called').willBe('called');

newVerb().to('try').theActor().once('tried').has('tried').is('trying').currently('tries').will('try')
    .theObject().was('tried').isBeing('tried').willBe('tried');

newVerb().to('feel').theActor().once('felt').has('felt').is('feeling').currently('feels').will('feel')
    .theObject().was('felt').isBeing('felt').willBe('felt');

newVerb().to('become').theActor().once('became').has('become').is('becoming').currently('becomes').will('become');

newVerb().to('leave').theActor().once('left').has('left').is('leaving').currently('leaves').will('leave')
    .theObject().was('left').isBeing('left').willBe('left');

newVerb().to('lead').theActor().once('lead').has('lead').is('leading').currently('leads').will('lead')
    .theObject().was('lead').isBeing('lead').willBe('lead');


newVerb().to('start').theActor().once('started').has('started').is('starting').currently('starts').will('start')
    .theObject().was('started').isBeing('started').willBe('started');

newVerb().to('include').theActor().once('included').has('included').is('including').currently('includes').will('include')
    .theObject().was('included').isBeing('included').willBe('included');

newVerb().to('claim').theActor().once('claimed').has('claimed').is('claiming').currently('claims').will('claim')
    .theObject().was('claimed').isBeing('claimed').willBe('claimed');

newVerb().to('launch').theActor().once('launched').has('launched').is('launching').currently('launches').will('launch')
    .theObject().was('launched').isBeing('launched').willBe('launched');

newVerb().to('create').theActor().once('created').has('created').is('creating').currently('creates').will('create')
    .theObject().was('created').isBeing('created').willBe('created');

newVerb().to('destroy').theActor().once('destroyed').has('destroyed').is('destroying').currently('destroys').will('destroy')
    .theObject().was('destroyed').isBeing('destroyed').willBe('destroyed');

newVerb().to('negate').theActor().once('negated').has('negated').is('negating').currently('negates').will('negate')
    .theObject().was('nagated').isBeing('nagated').willBe('nagated');


newVerb().to('suggest').theActor().once('suggested').has('suggested').is('suggesting').currently('suggests').will('suggest')
    .theObject().was('suggested').isBeing('suggested').willBe('suggested');


newVerb().to('estimate').theActor().once('estimated').has('estimated').is('estimating').currently('estimates').will('estimate')
    .theObject().was('estimated').isBeing('estimated').willBe('estimated');

newVerb().to('employ').theActor().once('employed').has('employed').is('employing').currently('employs').will('employ')
    .theObject().was('employed').isBeing('employed').willBe('employed');

newVerb().to('fire').theActor().once('fired').has('fired').is('firing').currently('fires').will('fire')
    .theObject().was('fired').isBeing('fired').willBe('fired');

newVerb().to('determine').theActor().once('determined').has('determined').is('determining').currently('determines').will('determine')
    .theObject().was('determined').isBeing('determined').willBe('determined');

newVerb().to('support').theActor().once('supported').has('supported').is('supporting').currently('supports').will('support')
    .theObject().was('supported').isBeing('supported').willBe('supported');

newVerb().to('require').theActor().once('required').has('required').is('requiring').currently('requires').will('require')
    .theObject().was('required').isBeing('required').willBe('required');

newVerb().to('build').theActor().once('built').has('built').is('building').currently('builds').will('build')
    .theObject().was('built').isBeing('built').willBe('built');

newVerb().to('produce').theActor().once('produced').has('produced').is('producing').currently('produces').will('produce')
    .theObject().was('produced').isBeing('produced').willBe('produced');

newVerb().to('grow').theActor().once('grew').has('grown').is('growing').currently('grows').will('grow')
    .theObject().was('grown').isBeing('grown').willBe('grown');

newVerb().to('enable').theActor().once('enabled').has('enabled').is('enabling').currently('enables').will('enable')
    .theObject().was('enabled').isBeing('enabled').willBe('enabled');

newVerb().to('disable').theActor().once('disabled').has('disabled').is('disabling').currently('disables').will('disable')
    .theObject().was('disabled').isBeing('disabled').willBe('disabled');

newVerb().to('pay').theActor().once('payed').has('payed').is('paying').currently('pays').will('pay')
    .theObject().was('payed').isBeing('payed').willBe('payed');

newVerb().to('refund').theActor().once('refunded').has('refunded').is('refunding').currently('refunds').will('refund')
    .theObject().was('refunded').isBeing('refunded').willBe('refunded');

newVerb().to('cover').theActor().once('covered').has('covered').is('covering').currently('covers').will('cover')
    .theObject().was('covered').isBeing('covered').willBe('covered');

newVerb().to('effect').theActor().once('effected').has('effected').is('effecting').currently('effects').will('effect')
    .theObject().was('effected').isBeing('effected').willBe('effected');

newVerb().to('believe').theActor().once('believed').has('believed').is('believing').currently('believes').will('believe')
    .theObject().was('believed').isBeing('believed').willBe('believed');

newVerb().to('activate').theActor().once('activated').has('activated').is('activating').currently('activates').will('activate')
    .theObject().was('activated').isBeing('activated').willBe('activated');

newVerb().to('deactivate').theActor().once('deactivated').has('deactivated').is('deactivating').currently('deactivates').will('deactivate')
    .theObject().was('deactivated').isBeing('deactivated').willBe('deactivated');

newVerb().to('set').theActor().once('set').has('set').is('setting').currently('sets').will('set')
    .theObject().was('set').isBeing('set').willBe('set');

newVerb().to('accept').theActor().once('accepted').has('accepted').is('accepting').currently('accepts').will('accept')
    .theObject().was('accepted').isBeing('accepted').willBe('accepted');

newVerb().to('discount').theActor().once('discounted').has('discounted').is('discounting').currently('discounts').will('discount')
    .theObject().was('discounted').isBeing('discounted').willBe('discounted');


newVerb().to('fix').theActor().once('fixed').has('fixed').is('fixing').currently('fixes').will('fix')
    .theObject().was('fixed').isBeing('fixed').willBe('fixed');

newVerb().to('approve').theActor().once('approved').has('approved').is('approving').currently('approves').will('approve')
    .theObject().was('approved').isBeing('approved').willBe('approved');

newVerb().to('apply').theActor().once('applied').has('applied').is('applying').currently('applies').will('apply')
    .theObject().was('applied').isBeing('applied').willBe('applied');

newVerb().to('avoid').theActor().once('avoided').has('avoided').is('avoiding').currently('avoids').will('avoid')
    .theObject().was('avoided').isBeing('avoided').willBe('avoided');


newVerb().to('purchase').theActor().once('purchased').has('purchased').is('purchasing').currently('purchases').will('purchase')
    .theObject().was('purchased').isBeing('purchased').willBe('purchased');

newVerb().to('provide').theActor().once('provided').has('provided').is('providing').currently('provides').will('provide')
    .theObject().was('provided').isBeing('provided').willBe('provided');

newVerb().to('identify').theActor().once('identified').has('identified').is('identifying').currently('identifies').will('identify')
    .theObject().was('identified').isBeing('identified').willBe('identified');

newVerb().to('deny').theActor().once('denied').has('denied').is('denying').currently('denies').will('deny')
    .theObject().was('denied').isBeing('denied').willBe('denied');

newVerb().to('mask').theActor().once('masked').has('masked').is('masking').currently('masks').will('mask')
    .theObject().was('masked').isBeing('masked').willBe('masked');


newVerb().to('cancel').theActor().once('cancelled').has('cancelled').is('cancelling').currently('cancels').will('cacel')
    .theObject().was('cancelled').isBeing('cancelled').willBe('cancelled');


newVerb().to('install').theActor().once('installed').has('installed').is('installing').currently('installs').will('install')
    .theObject().was('installed').isBeing('installed').willBe('installed');


newVerb().to('fund').theActor().once('funded').has('funded').is('funding').currently('funds').will('fund')
    .theObject().was('funded').isBeing('funded').willBe('funded');


newVerb().to('increase').theActor().once('increased').has('increased').is('increasing').currently('increases').will('increase')
    .theObject().was('increased').isBeing('increased').willBe('increased');

newVerb().to('guarantee').theActor().once('guaranteed').has('guaranteed').is('guaranteeing').currently('guarantees').will('guarantee')
    .theObject().was('guaranteed').isBeing('guaranteed').willBe('guaranteed');


newVerb().to('decrease').theActor().once('decreased').has('decreased').is('decreasing').currently('decreases').will('decrease')
    .theObject().was('decreased').isBeing('decreased').willBe('decreased');

newVerb().to('select').theActor().once('selected').has('selected').is('selecting').currently('selects').will('select')
    .theObject().was('selected').isBeing('selected').willBe('selected');


newVerb().to('sell').theActor().once('sold').has('sold').is('selling').currently('sells').will('sell')
    .theObject().was('sold').isBeing('sold').willBe('sold');

newVerb().to('limit').theActor().once('limited').has('limited').is('limiting').currently('limits').will('limit')
    .theObject().was('limited').isBeing('limited').willBe('limited');

newVerb().to('study').theActor().once('studied').has('studied').is('studying').currently('studies').will('study')
    .theObject().was('studied').isBeing('studied').willBe('studied');

function getVerbInfo(word) {
    var result = null;

    if (word) {
        cleanWord = word.toLowerCase();
        result = verbMap[cleanWord];
    }

    return result;
}

module.exports.getVerbInfo = getVerbInfo;
