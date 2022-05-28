
// TODO change the fix rules for each user based on their Characteristics
var _grades_rules = {
    "starting": {
        "0": [
            [0.5, "6"],
            [0.25, "3"],
            [0.25, "2"]
        ],
        "1": [
            [0.3, "1"],
            [0.3, "3"],
            [0.2, "5"],
            [0.1, "7"]
        ],
        "0.5": [
            [0.3, "1"],
            [0.3, "3"],
            [0.3, "4"]
        ]
    },
    "ruleset": {
        "0": {
            "1": [
                [0.5, "7"],
                [0.5, "6"]
            ],
            "2": [
                [0.3, "3"],
                [0.7, "6"]
            ],
            "3": [
                [0.5, "1"],
                [0.5, "7"]
            ],
            "4": [
                [0.5, "2"],
                [0.5, "1"]
            ],
            "5": [
                [0.5, "2"],
                [0.5, "7"]
            ],
            "6": [
                [0.5, "3"],
                [0.3, "5"],
                [0.2, "8"]
            ],
            "7": [
                [0.5, "4"],
                [0.5, "2"]
            ],
            "8": [
                [1, "3"]
            ]
        },
        "1": {
            "1": [
                [0.1, "5"],
                [0.2, "4"],
                [0.2, "6"],
                [0.3, "3"],
                [0.2, "2"]
            ],
            "2": [
                [0.7, "1"],
                [0.2, "3"],
                [0.1, "6"]
            ],
            "3": [
                [0.2, "1"],
                [0.1, "2"],
                [0.5, "5"],
                [0.2, "6"]
            ],
            "4": [
                [0.1, "3"],
                [0.5, "5"],
                [0.3, "2"],
                [0.1, "1"]
            ],
            "5": [
                [0.2, "3"],
                [0.2, "5"],
                [0.2, "6"],
                [0.3, "8"],
                [0.1, "2"]
            ],
            "6": [
                [0.5, "2"],
                [0.4, "5"],
                [0.1, "7 8"]
            ],
            "7": [
                [0.9, "8"],
                [0.1, "6"]
            ],
            "8": [
                [0.5, "6"],
                [0.1, "7"],
                [0.1, "8"],
                [0.3, "1"]
            ]
        },
        "0.5": {
            "1": null,
            "2": null,
            "3": null,
            "4": null,
            "5": null,
            "6": null,
            "7": null,
            "8": null
        }
    }
};
var _duration_rules = {
    "starting": {
        "0": [
            [0.5, "1"],
            [0.5, "0.5"]
        ],
        "1": [
            [0.6, "0.5"],
            [0.4, "1"]
        ],
        "0.5": [
            [1, "1"]
        ]
    },
    "ruleset": {
        "0": {
            "1": [
                [0.5, "0.5"],
                [0.45, "0.5 0.5"],
                [0.05, "2 0.5 0.5"]
            ],
            "2": [
                [0.5, "1"],
                [0.5, "1 1"]
            ],
            "0.5": [
                [0.5, "0.5"],
                [0.5, "1 1"]
            ]
        },
        "1": {
            "1": [
                [0.5, "1"],
                [0.4, "0.5 0.5"],
                [0.1, "2"]
            ],
            "2": [
                [0.5, "1 1"],
                [0.5, "0.5 1 0.5"]
            ],
            "0.5": [
                [0.5, "1"],
                [0.4, "0.5 1 0.5"],
                [0.1, "0.25 0.25 0.5"]
            ]
        },
        "0.5": {
            "1": [
                [0.5, "1"],
                [0.5, "0.5 0.5"]
            ],
            "0.5": [
                [0.5, "0.5 1"],
                [0.4, "1 0.5"],
                [0.1, "0.25 0.25 1"]
            ]
        }
    }
};
var MODES = ["locrian", "phrygian", "aeolian", "dorian", "mixolydian", "ionian", "lydian"];
// var ALLOWED_ROOT_NAMES = ["C", "C#", "D", "E-", "E", "F", "F#", "G", "A-", "A", "B-", "B"];
var ALLOWED_ROOT_NAMES = ["C", "C", "D", "E", "E", "F", "F", "G", "A", "A", "B", "B"];
var MODE2SHIFT = {
    "locrian": "M7",
    "phrygian": "M3",
    "aeolian": "M6",
    "dorian": "M2",
    "mixolydian": "P5",
    "ionian": "P1",
    "lydian": "P4",
};
var typeFromNumDict = {
    1.0: 'whole',
    2.0: 'half',
    4.0: 'quarter',
    8.0: 'eighth',
    16.0: '16th',
    32.0: '32nd',
    64.0: '64th',
    128.0: '128th',
    256.0: '256th',
    512.0: '512th',
    1024.0: '1024th',
    2048.0: '2048th',
    0.0: 'zero',
    0.5: 'breve',
    0.25: 'longa',
    0.125: 'maxima',
    0.0625: 'duplex-maxima',
}

function select_range(low, up, ratio) {
    //"""select a integer value within `low` and `up` (included) based on `ratio`"""
    let diff = up - low;
    let shift = low;
    return Math.round(ratio * diff + shift);
}

function round_over(val, values) {
    //"""round `val` to the closest value in `values`"""
    let rounded = parseFloat(Infinity)
    values.forEach(function(step) {
        if (Math.abs(val - rounded) > Math.abs(val - step)) {
            rounded = step;
        }
    })
    return rounded;
}

function pick_string(rule, n) {
    let low = 0;
    for (var i = 0; i < rule.length; i++) {
        let chance = rule[i];
        if (n >= low && n < chance[0] + low) {
            // console.log('pick_string_chance', chance, chance[1])
            return chance[1]
        }
        low += chance[0];
    }
    // console.log('pick_string', rule, rule[rule.length - 1][1])
    return rule[rule.length - 1][1];
}

function pick_starting_symb(gram, variant) {
    var rule = gram["starting"][variant];
    let pick_out = pick_string(rule, Math.random())
        // console.log('pick_starting_symb', variant, rule, pick_out)
    return pick_out;
}

function apply_to(gram, inp, variant) {
    let out = [];
    let ruleset = gram["ruleset"][variant];
    for (var i = 0; i < inp.length; i++) {
        let sym = inp[i];
        let rule = ruleset[sym] ? ruleset[sym] : [
            [1, ""]
        ];
        // console.log('apply_to_rule', rule, ruleset)
        let s = pick_string(rule, Math.random());
        if (s.length > 0) {
            // console.log('apply_to_s', s, s.split(" "))
            out = out.concat(s.split(" ")) //
        }
    }
    // console.log('apply_to', variant, inp, out)
    return out
}

function generate_sequence(gram, size, variant) {
    var seq, next;
    seq = [];
    next = [pick_starting_symb(gram, variant)];
    while (seq.length < size) {
        // console.log('apply_to_while', seq.length, size, seq.length < size);
        next = apply_to(gram, next, variant);
        seq = seq.concat(next);
        if ((next.length) === 0) {
            // console.log('apply_to_break', next);
            break;
        }
    }
    // console.log('generate_sequence', seq)
    return seq.slice(0, size)
}

function moodMelody (valence,arousal,size) {
    var base_root = Math.floor(Math.random() * 12)

    var tempo = select_range(0.5, 2, arousal)
    var mode = MODES[select_range(1, MODES.length, valence) - 1]

    // # TODO: OSMD has issues if using self.key directly (because of the mode?)
    // pitchToSharps = new music21.key.pitchToSharps(root, mode)
    //

    var v = round_over(valence, [0, 1]) // TODO: add 0.5 when done
    var grades = generate_sequence(_grades_rules, size, v) //# TODO: change number maybe

    var a = round_over(arousal, [0, 0.5, 1])
    var durations = generate_sequence(_duration_rules, grades.length, a)

    console.log('~~~~~!!!!!~~~~~', grades.toString(), durations.toString());

	var n=[];
    for (var i = 0; i < Math.min(grades.length, durations.length); i++) {
        if (grades[i] > 0) {
            n.push([ALLOWED_ROOT_NAMES[grades[i]], parseFloat(durations[i])*tempo]);
        } else {
            // n.push([' ']);
        }
        // n.duration = new music21.duration.Duration(typeFromNumDict[durations[i]]); //
    }
	return n;
}

export default moodMelody