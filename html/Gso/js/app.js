var cat_obj_arr = [{
        strength: "Useless!",
        desc: "A cyber security expert could crack this password quicker than it would take for you to finish reading this sentence."
    }, {
        strength: "So-so...",
        desc: "A cyber security expert could crack your password before you came back from your holiday."
    }, {
        strength: "Ok la",
        desc: "A cyber security expert could crack your password during your one-week holiday."
    }, {
        strength: "Not bad!",
        desc: "It would take a super computer <span id='time_to_crack2'></span> to crack this password."
    }, {
        strength: "SWEE!!",
        desc: "It would take a super computer <span id='time_to_crack2'></span> to crack this password."
    }],
    suggestions_obj = {
        "Common Password": "Your password is very commonly-used, try creating a passphrase from a memory unique to you.",
        "Common Password 10": "Your password is very commonly-used, try creating a passphrase from a memory unique to you.",
        "Common Password 100": "Your password is very commonly-used, try creating a passphrase from a memory unique to you.",
        "Name": "Your password looks like a name, which can be easily cracked or guessed, try creating a passphrase from a memory unique to you.",
        "Too Short": "Your password is quite short, try a strong password of at least 12 characters.",
        "Only One Word": "Your password is quite short, the longer a password is, the more secure it will be. Try creating a strong password of at least 12 characters.",
        "All Upper": "Try a mix of uppercase and lowercase letters, numbers or symbols to make your password more random and difficult to guess. ",
        "All Lower": "Try a mix of uppercase and lowercase letters, numbers or symbols to make your password more random and difficult to guess.",
        "Predictable Substitute": "Replacing a letter with a number or symbol like ‘@’ instead of ‘a’ doesn’t add complexity to your password. Try creating a passphrase from a memory unique to you.",
        "Reversed Word": "Reversed words are not as difficult to guess as you think, try creating a passphrase from a memory unique to you.",
        "Common Name": "Your password looks like a name, which can be easily cracked or guessed. Try creating a passphrase from a memory unique to you.",
        "Obvious Cap": "Capitalising the first letter of the password is an obvious pattern. Remember to keep your password random by ensuring that it does not have a pattern and is unpredictable.",
        "Just Numbers": "Your password only contains numbers. Adding letters or symbols will make your password more secure.",
        "Just Letters": "Your password only contains letters. Adding letters or symbols will make your password more secure.",
        "Just Symbols": "Your password only contains symbols. Adding letters or symbols will make your password more secure.",
        "Possibly a Telephone Number or Birthdate": "Your password looks like it contains personal information that can be easily guessed, such as a phone number or a birthdate. Try creating a passphrase from a memory unique to you.",
        "Repeated Pattern": "Repeated characters or patterns can make your password more predictable. Try creating a passphrase from a memory unique to you.",
        "Keyboard Pattern": "Repeated characters or patterns can make your password more predictable, try creating a passphrase from a memory unique to you.",
        "Common Sequence": "Repeated characters or patterns can make your password more predictable, try creating a passphrase from a memory unique to you.",
        CSA: "Fun fact: SingCERT is technically older than CSA",
        SingCERT: "Singapore's own CERT team :)",
        "SingCERT Cyber": 'Actually, the "C" in CERT stands for "Computer" ',
        "SingCERT Full": "SingCERT! That's my creator!",
        "I Love You": "Sorry, I can't love...",
        "Marry Mii": "That's a little soon don't cha think?",
        42: "That's the answer to the ultimate question of life, the universe, and everything",
        "Ultimate Question": "42"
    };

function convert_ms_to_years(e) {
    return Math.floor(e / 31536e6)
}

function run_password_analysis() {
    $("#password-checks").empty(), $("#time_to_crack2").html("–");
    var e = $("#password-box").val();
    if ("" != e) {
        var s = zxcvbn(e);
        switch ($("#password-time").html(cat_obj_arr[s.score].strength), $("#password-box").removeClass(), s.score) {
            case 1:
                $("#password-box").addClass("hsimp-level--insecure");
                break;
            case 2:
            case 3:
                $("#password-box").addClass("hsimp-level--ok");
                break;
            case 4:
            case 5:
                $("#password-box").addClass("hsimp-level--good");
                break;
            default:
                $("#password-box").addClass("hsimp-level--bad")
        }
        if ("centuries" == s.crack_times_display.online_no_throttling_10_per_second) {
            var o = convertMStoYears(100 * s.crack_times_seconds.online_no_throttling_10_per_second);
            $("#time_to_crack2").html(o)
        } else $("#time_to_crack2").html(s.crack_times_display.online_no_throttling_10_per_second);
        for (var r = generate_other_suggestions(e, s.feedback.suggestions), t = 0; t < r.length; t++) {
            var a = "";
            for (var i in suggestions_obj) suggestions_obj.hasOwnProperty(i) && suggestions_obj[i] == r[t] && (a = i);
            $("#password-checks").append("<li><div><div class='suggestions_numbering'>" + a + "</div><div class='suggestions_text'>" + r[t] + "</div></div></li>")
        }
    } else $("#password-box").removeClass(), $("#password-box").addClass("hsimp-level")
}

function generate_other_suggestions(e, s) {
    var o = /[a-z]/i.test(e),
        r = /\d/.test(e),
        t = /[^\x00-\x7F]/.test(e),
        a = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(e),
        i = s.filter(function(e) {
            return "" != e
        });
    return e.length < 12 && i.push(suggestions_obj["Too Short"]), o || t || a || !r || i.push(suggestions_obj["Just Numbers"]), !o || t || a || r || i.push(suggestions_obj["Just Letters"]), o || !t || a || r || i.push(suggestions_obj["Just Symbols"]), i = add_easter_eggs(e, i)
}

function add_easter_eggs(e, s) {
    switch (e.toLowerCase().replace(" ", "")) {
        case "singcert":
            s.push(suggestions_obj.SingCERT);
            break;
        case "singaporecomputeremergencyresponseteam":
            s.push(suggestions_obj["SingCERT Full"]);
            break;
        case "singaporecyberemergencyresponseteam":
            s.push(suggestions_obj["SingCERT Cyber"]);
            break;
        case "cybersecurityagency":
            s.push(suggestions_obj.CSA);
            break;
        case "iloveyou":
            s.push(suggestions_obj["I Love You"]);
            break;
        case "42":
            s.push(suggestions_obj[42]);
            break;
        case "theanswertotheultimatequestionoflifetheuniverseandeverything":
            s.push(suggestions_obj["Ultimate Question"]);
            break;
        case "willyoumarryme":
        case "marryme":
            s.push(suggestions_obj["Marry Mii"])
    }
    return s
}

function convertMS(e) {
    var s, o, r;
    return r = Math.floor(e / 1e3), o = Math.floor(r / 60), r %= 60, s = Math.floor(o / 60), o %= 60, {
        day: Math.floor(s / 24),
        hour: s %= 24,
        minute: o,
        seconds: r
    }
}
var big_num_arr = [
    [2, "hundred"],
    [3, "thousand"],
    [6, "million"],
    [9, "billion"],
    [12, "trillion"],
    [15, "quadrillion"],
    [18, "quintillion"],
    [21, "sextillion"],
    [24, "septillion"],
    [27, "octillion"],
    [30, "nonillion"],
    [33, "decillion"],
    [36, "undecillion"],
    [39, "duodecillion"],
    [42, "tredecillion"],
    [45, "quattuordecillion"],
    [48, "quindecillion"],
    [51, "sexdecillion"],
    [54, "septendecillion"],
    [57, "octodecillion"],
    [60, "novemdecillion"],
    [63, "vigintillion"],
    [66, "unvigintillion"],
    [69, "duovigintillion"],
    [72, "tresvigintillion"],
    [75, "quattuorvigintillion"],
    [78, "quinquavigintillion"],
    [81, "sesvigintillion"],
    [84, "septemvigintillion"],
    [87, "octovigintillion"],
    [90, "novemvigintillion"],
    [93, "trigintillion"],
    [96, "untrigintillion"],
    [99, "duotrigintillion"],
    [100, "googol"],
    [102, "trestrigintillion"],
    [105, "quattuortrigintillion"],
    [108, "quinquatrigintillion"],
    [111, "sestrigintillion"],
    [114, "septentrigintillion"],
    [117, "octotrigintillion"],
    [120, "noventrigintillion"]
];

function convertMStoYears(e) {
    var s = "",
        o = convertMS(e).day / 365,
        r = Math.ceil(Math.log(o + 1) * Math.LOG10E);
    if (120 < r) s = "a really long time";
    else
        for (var t = 1; t < big_num_arr.length; t++)
            if (r <= big_num_arr[t][0]) {
                var a = big_num_arr[t - 1][1];
                s = Math.ceil(o / Math.pow(10, big_num_arr[t - 1][0])).toString() + " " + a + " years";
                break
            } return s
};