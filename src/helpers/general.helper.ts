import axios from 'axios';

export async function createContributer(data: any) {
    console.log(process.env.GHOST_API_URL)
    try {
        const authenticate = await axios.post(
            `${process.env.GHOST_API_URL}/ghost/api/admin/session`,
            {
                username: process.env.GHOST_ADMIN_USERNAME,
                password: process.env.GHOST_ADMIN_PASSWORD,
            },
        );

        const result = await axios.post(
            `${process.env.GHOST_API_URL}/ghost/api/admin/invites`,
            {
                invites: [
                    {
                        token: null,
                        email: data.email,
                        expires: null,
                        status: null,
                        role_id: process.env.GHOST_CONTRIBUTER_ROLE_ID,
                    },
                ],
            },
            {
                headers: {
                    Cookie: authenticate.headers['set-cookie'],
                },
            },
        );

        return result;
    } catch (err) {
        console.log('ERROR: ', err.message)
    }
}

export function generateRandom(len: number) {
    return Math.random()
        .toString(36)
        .substring(2, len + 2);
}

export const general_token = (refresh_token: any, res: any) => {
    console.log(process.env.COOKIE_HTTP_ONLY)
    res.cookie('refresh-token', refresh_token, {
        expires: new Date(new Date().getTime() + 60 * 1000 * 60 * 2),
        httpOnly: process.env.COOKIE_HTTP_ONLY,
        sameSite: process.env.COOKIE_SAME_SITE,
        secure: process.env.COOKIE_SECURE,
    });
};

export const getDateLastThirtyDayAgo = () => {
    const today = new Date();
    const priorDate = new Date(new Date().setDate(today.getDate() - 120));
    return priorDate
}

export const getRequiredDate = (days: number) => {
    const today = new Date();
    const priorDate = new Date(new Date().setDate(today.getDate() - days));
    return priorDate
}


export const getCurrentDate = () => {
    const today = new Date();
    return today
}

export const getDateDifference = (dateFrom: any, dateTo: any) => {
    const date1: any = new Date(dateFrom);
    const date2: any = new Date(dateTo);
    const diffTime: any = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays
}

export const getMonthName = (monthNumber: any) => {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString('en-US', {month: 'long'});
}

export const languagesData = () => {
    return [
        {value: 'Abkhazian', label: 'Abkhazian'},
        {value: 'Afar', label: 'Afar'},
        {value: 'Afrikaans', label: 'Afrikaans'},
        {value: 'Akan', label: 'Akan'},
        {value: 'Albanian', label: 'Albanian'},
        {value: 'Amharic', label: 'Amharic'},
        {value: 'Arabic', label: 'Arabic'},
        {value: 'Aragonese', label: 'Aragonese'},
        {value: 'Armenian', label: 'Armenian'},
        {value: 'Assamese', label: 'Assamese'},
        {value: 'Avaric', label: 'Avaric'},
        {value: 'Avestan', label: 'Avestan'},
        {value: 'Aymara', label: 'Aymara'},
        {value: 'Azerbaijani', label: 'Azerbaijani'},
        {value: 'Bambara', label: 'Bambara'},
        {value: 'Bashkir', label: 'Bashkir'},
        {value: 'Basque', label: 'Basque'},
        {value: 'Belarusian', label: 'Belarusian'},
        {value: 'Bengali', label: 'Bengali'},
        {value: 'Bihari', label: 'Bihari languages'},
        {value: 'Bislama', label: 'Bislama'},
        {value: 'Bosnian', label: 'Bosnian'},
        {value: 'Breton', label: 'Breton'},
        {value: 'Bulgarian', label: 'Bulgarian'},
        {value: 'Burmese', label: 'Burmese'},
        {value: 'Catalan', label: 'Catalan, Valencian'},
        {value: 'Central', label: 'Central Khmer'},
        {value: 'Chamorro', label: 'Chamorro'},
        {value: 'Chechen', label: 'Chechen'},
        {value: 'Chichewa', label: 'Chichewa, Chewa, Nyanja'},
        {value: 'Chinese', label: 'Chinese'},
        {
            value: 'Church',
            label: 'Church Slavonic, Old Bulgarian, Old Church Slavonic'
        },
        {value: 'Chuvash', label: 'Chuvash'},
        {value: 'Cornish', label: 'Cornish'},
        {value: 'Corsican', label: 'Corsican'},
        {value: 'Cree', label: 'Cree'},
        {value: 'Croatian', label: 'Croatian'},
        {value: 'Czech', label: 'Czech'},
        {value: 'Danish', label: 'Danish'},
        {value: 'Divehi', label: 'Divehi, Dhivehi, Maldivian'},
        {value: 'Dutch', label: 'Dutch, Flemish'},
        {value: 'Dzongkha', label: 'Dzongkha'},
        {value: 'English', label: 'English'},
        {value: 'Esperanto', label: 'Esperanto'},
        {value: 'Estonian', label: 'Estonian'},
        {value: 'Ewe', label: 'Ewe'},
        {value: 'Faroese', label: 'Faroese'},
        {value: 'Fijian', label: 'Fijian'},
        {value: 'Finnish', label: 'Finnish'},
        {value: 'French', label: 'French'},
        {value: 'Fulah', label: 'Fulah'},
        {value: 'Gaelic', label: 'Gaelic, Scottish Gaelic'},
        {value: 'Galician', label: 'Galician'},
        {value: 'Ganda', label: 'Ganda'},
        {value: 'Georgian', label: 'Georgian'},
        {value: 'German', label: 'German'},
        {value: 'Gikuyu', label: 'Gikuyu, Kikuyu'},
        {value: 'Greek', label: 'Greek (Modern)'},
        {value: 'Greenlandic', label: 'Greenlandic, Kalaallisut'},
        {value: 'Guarani', label: 'Guarani'},
        {value: 'Gujarati', label: 'Gujarati'},
        {value: 'Haitian', label: 'Haitian, Haitian Creole'},
        {value: 'Hausa', label: 'Hausa'},
        {value: 'Hebrew', label: 'Hebrew'},
        {value: 'Herero', label: 'Herero'},
        {value: 'Hindi', label: 'Hindi'},
        {value: 'Hiri', label: 'Hiri Motu'},
        {value: 'Hungarian', label: 'Hungarian'},
        {value: 'Icelandic', label: 'Icelandic'},
        {value: 'Ido', label: 'Ido'},
        {value: 'Igbo', label: 'Igbo'},
        {value: 'Indonesian', label: 'Indonesian'},
        {value: 'Interlingue', label: 'Interlingue'},
        {value: 'Inuktitut', label: 'Inuktitut'},
        {value: 'Inupiaq', label: 'Inupiaq'},
        {value: 'Irish', label: 'Irish'},
        {value: 'Italian', label: 'Italian'},
        {value: 'Japanese', label: 'Japanese'},
        {value: 'Javanese', label: 'Javanese'},
        {value: 'Kannada', label: 'Kannada'},
        {value: 'Kanuri', label: 'Kanuri'},
        {value: 'Kashmiri', label: 'Kashmiri'},
        {value: 'Kazakh', label: 'Kazakh'},
        {value: 'Kinyarwanda', label: 'Kinyarwanda'},
        {value: 'Komi', label: 'Komi'},
        {value: 'Kongo', label: 'Kongo'},
        {value: 'Korean', label: 'Korean'},
        {value: 'Kwanyama', label: 'Kwanyama, Kuanyama'},
        {value: 'Kurdish', label: 'Kurdish'},
        {value: 'Kyrgyz', label: 'Kyrgyz'},
        {value: 'Lao', label: 'Lao'},
        {value: 'Latin', label: 'Latin'},
        {value: 'Latvian', label: 'Latvian'},
        {value: 'Letzeburgesch', label: 'Letzeburgesch, Luxembourgish'},
        {value: 'Limburgish', label: 'Limburgish, Limburgan, Limburger'},
        {value: 'Lingala', label: 'Lingala'},
        {value: 'Lithuanian', label: 'Lithuanian'},
        {value: 'Luba', label: 'Luba-Katanga'},
        {value: 'Macedonian', label: 'Macedonian'},
        {value: 'Malagasy', label: 'Malagasy'},
        {value: 'Malay', label: 'Malay'},
        {value: 'Malayalam', label: 'Malayalam'},
        {value: 'Maltese', label: 'Maltese'},
        {value: 'Manx', label: 'Manx'},
        {value: 'Maori', label: 'Maori'},
        {value: 'Marathi', label: 'Marathi'},
        {value: 'Marshallese', label: 'Marshallese'},
        {value: 'Moldovan', label: 'Moldovan, Moldavian, Romanian'},
        {value: 'Mongolian', label: 'Mongolian'},
        {value: 'Nauru', label: 'Nauru'},
        {value: 'Navajo', label: 'Navajo, Navaho'},
        {value: 'Northern', label: 'Northern Ndebele'},
        {value: 'Ndonga', label: 'Ndonga'},
        {value: 'Nepali', label: 'Nepali'},
        {value: 'Northern', label: 'Northern Sami'},
        {value: 'Norwegian', label: 'Norwegian'},
        {value: 'Norwegian', label: 'Norwegian Bokmål'},
        {value: 'Norwegian', label: 'Norwegian Nynorsk'},
        {value: 'Nuosu', label: 'Nuosu, Sichuan Yi'},
        {value: 'Occitan', label: 'Occitan (post 1500)'},
        {value: 'Ojibwa', label: 'Ojibwa'},
        {value: 'Oriya', label: 'Oriya'},
        {value: 'Oromo', label: 'Oromo'},
        {value: 'Ossetian', label: 'Ossetian, Ossetic'},
        {value: 'Pali', label: 'Pali'},
        {value: 'Panjabi', label: 'Panjabi, Punjabi'},
        {value: 'Pashto', label: 'Pashto, Pushto'},
        {value: 'Persian', label: 'Persian'},
        {value: 'Polish', label: 'Polish'},
        {value: 'Portuguese', label: 'Portuguese'},
        {value: 'Quechua', label: 'Quechua'},
        {value: 'Romansh', label: 'Romansh'},
        {value: 'Rundi', label: 'Rundi'},
        {value: 'Russian', label: 'Russian'},
        {value: 'Samoan', label: 'Samoan'},
        {value: 'Sango', label: 'Sango'},
        {value: 'Sanskrit', label: 'Sanskrit'},
        {value: 'Sardinian', label: 'Sardinian'},
        {value: 'Serbian', label: 'Serbian'},
        {value: 'Shona', label: 'Shona'},
        {value: 'Sindhi', label: 'Sindhi'},
        {value: 'Sinhala', label: 'Sinhala, Sinhalese'},
        {value: 'Slovak', label: 'Slovak'},
        {value: 'Slovenian', label: 'Slovenian'},
        {value: 'Somali', label: 'Somali'},
        {value: 'Sotho', label: 'Sotho, Southern'},
        {value: 'South', label: 'South Ndebele'},
        {value: 'Spanish', label: 'Spanish, Castilian'},
        {value: 'Sundanese', label: 'Sundanese'},
        {value: 'Swahili', label: 'Swahili'},
        {value: 'Swati', label: 'Swati'},
        {value: 'Swedish', label: 'Swedish'},
        {value: 'Tagalog', label: 'Tagalog'},
        {value: 'Tahitian', label: 'Tahitian'},
        {value: 'Tajik', label: 'Tajik'},
        {value: 'Tamil', label: 'Tamil'},
        {value: 'Tatar', label: 'Tatar'},
        {value: 'Telugu', label: 'Telugu'},
        {value: 'Thai', label: 'Thai'},
        {value: 'Tibetan', label: 'Tibetan'},
        {value: 'Tigrinya', label: 'Tigrinya'},
        {value: 'Tonga', label: 'Tonga (Tonga Islands)'},
        {value: 'Tsonga', label: 'Tsonga'},
        {value: 'Tswana', label: 'Tswana'},
        {value: 'Turkish', label: 'Turkish'},
        {value: 'Turkmen', label: 'Turkmen'},
        {value: 'Twi', label: 'Twi'},
        {value: 'Uighur', label: 'Uighur, Uyghur'},
        {value: 'Ukrainian', label: 'Ukrainian'},
        {value: 'Urdu', label: 'Urdu'},
        {value: 'Uzbek', label: 'Uzbek'},
        {value: 'Venda', label: 'Venda'},
        {value: 'Vietnamese', label: 'Vietnamese'},
        {value: 'Volap_k', label: 'Volap_k'},
        {value: 'Walloon', label: 'Walloon'},
        {value: 'Welsh', label: 'Welsh'},
        {value: 'Western', label: 'Western Frisian'},
        {value: 'Wolof', label: 'Wolof'},
        {value: 'Xhosa', label: 'Xhosa'},
        {value: 'Yiddish', label: 'Yiddish'},
        {value: 'Yoruba', label: 'Yoruba'},
        {value: 'Zhuang', label: 'Zhuang, Chuang'},
        {value: 'Zulu', label: 'Zulu'}
    ]
};

export const CountryData = () => {
    return [
        {code: 'AD', label: 'Andorra', phone: '376'},
        {
            code: 'AE',
            label: 'United Arab Emirates',
            phone: '971'
        },
        {code: 'AF', label: 'Afghanistan', phone: '93'},
        {
            code: 'AG',
            label: 'Antigua and Barbuda',
            phone: '1-268'
        },
        {code: 'AI', label: 'Anguilla', phone: '1-264'},
        {code: 'AL', label: 'Albania', phone: '355'},
        {code: 'AM', label: 'Armenia', phone: '374'},
        {code: 'AO', label: 'Angola', phone: '244'},
        {code: 'AQ', label: 'Antarctica', phone: '672'},
        {code: 'AR', label: 'Argentina', phone: '54'},
        {code: 'AS', label: 'American Samoa', phone: '1-684'},
        {code: 'AT', label: 'Austria', phone: '43'},
        {
            code: 'AU',
            label: 'Australia',
            phone: '61',
            suggested: true
        },
        {code: 'AW', label: 'Aruba', phone: '297'},
        {code: 'AX', label: 'Alland Islands', phone: '358'},
        {code: 'AZ', label: 'Azerbaijan', phone: '994'},
        {
            code: 'BA',
            label: 'Bosnia and Herzegovina',
            phone: '387'
        },
        {code: 'BB', label: 'Barbados', phone: '1-246'},
        {code: 'BD', label: 'Bangladesh', phone: '880'},
        {code: 'BE', label: 'Belgium', phone: '32'},
        {code: 'BF', label: 'Burkina Faso', phone: '226'},
        {code: 'BG', label: 'Bulgaria', phone: '359'},
        {code: 'BH', label: 'Bahrain', phone: '973'},
        {code: 'BI', label: 'Burundi', phone: '257'},
        {code: 'BJ', label: 'Benin', phone: '229'},
        {code: 'BL', label: 'Saint Barthelemy', phone: '590'},
        {code: 'BM', label: 'Bermuda', phone: '1-441'},
        {code: 'BN', label: 'Brunei Darussalam', phone: '673'},
        {code: 'BO', label: 'Bolivia', phone: '591'},
        {code: 'BR', label: 'Brazil', phone: '55'},
        {code: 'BS', label: 'Bahamas', phone: '1-242'},
        {code: 'BT', label: 'Bhutan', phone: '975'},
        {code: 'BV', label: 'Bouvet Island', phone: '47'},
        {code: 'BW', label: 'Botswana', phone: '267'},
        {code: 'BY', label: 'Belarus', phone: '375'},
        {code: 'BZ', label: 'Belize', phone: '501'},
        {
            code: 'CA',
            label: 'Canada',
            phone: '1',
            suggested: true
        },
        {
            code: 'CC',
            label: 'Cocos (Keeling) Islands',
            phone: '61'
        },
        {
            code: 'CD',
            label: 'Congo, Democratic Republic of the',
            phone: '243'
        },
        {
            code: 'CF',
            label: 'Central African Republic',
            phone: '236'
        },
        {
            code: 'CG',
            label: 'Congo, Republic of the',
            phone: '242'
        },
        {code: 'CH', label: 'Switzerland', phone: '41'},
        {code: 'CI', label: "Cote d'Ivoire", phone: '225'},
        {code: 'CK', label: 'Cook Islands', phone: '682'},
        {code: 'CL', label: 'Chile', phone: '56'},
        {code: 'CM', label: 'Cameroon', phone: '237'},
        {code: 'CN', label: 'China', phone: '86'},
        {code: 'CO', label: 'Colombia', phone: '57'},
        {code: 'CR', label: 'Costa Rica', phone: '506'},
        {code: 'CU', label: 'Cuba', phone: '53'},
        {code: 'CV', label: 'Cape Verde', phone: '238'},
        {code: 'CW', label: 'Curacao', phone: '599'},
        {code: 'CX', label: 'Christmas Island', phone: '61'},
        {code: 'CY', label: 'Cyprus', phone: '357'},
        {code: 'CZ', label: 'Czech Republic', phone: '420'},
        {
            code: 'DE',
            label: 'Germany',
            phone: '49',
            suggested: true
        },
        {code: 'DJ', label: 'Djibouti', phone: '253'},
        {code: 'DK', label: 'Denmark', phone: '45'},
        {code: 'DM', label: 'Dominica', phone: '1-767'},
        {
            code: 'DO',
            label: 'Dominican Republic',
            phone: '1-809'
        },
        {code: 'DZ', label: 'Algeria', phone: '213'},
        {code: 'EC', label: 'Ecuador', phone: '593'},
        {code: 'EE', label: 'Estonia', phone: '372'},
        {code: 'EG', label: 'Egypt', phone: '20'},
        {code: 'EH', label: 'Western Sahara', phone: '212'},
        {code: 'ER', label: 'Eritrea', phone: '291'},
        {code: 'ES', label: 'Spain', phone: '34'},
        {code: 'ET', label: 'Ethiopia', phone: '251'},
        {code: 'FI', label: 'Finland', phone: '358'},
        {code: 'FJ', label: 'Fiji', phone: '679'},
        {
            code: 'FK',
            label: 'Falkland Islands (Malvinas)',
            phone: '500'
        },
        {
            code: 'FM',
            label: 'Micronesia, Federated States of',
            phone: '691'
        },
        {code: 'FO', label: 'Faroe Islands', phone: '298'},
        {
            code: 'FR',
            label: 'France',
            phone: '33',
            suggested: true
        },
        {code: 'GA', label: 'Gabon', phone: '241'},
        {code: 'GB', label: 'United Kingdom', phone: '44'},
        {code: 'GD', label: 'Grenada', phone: '1-473'},
        {code: 'GE', label: 'Georgia', phone: '995'},
        {code: 'GF', label: 'French Guiana', phone: '594'},
        {code: 'GG', label: 'Guernsey', phone: '44'},
        {code: 'GH', label: 'Ghana', phone: '233'},
        {code: 'GI', label: 'Gibraltar', phone: '350'},
        {code: 'GL', label: 'Greenland', phone: '299'},
        {code: 'GM', label: 'Gambia', phone: '220'},
        {code: 'GN', label: 'Guinea', phone: '224'},
        {code: 'GP', label: 'Guadeloupe', phone: '590'},
        {code: 'GQ', label: 'Equatorial Guinea', phone: '240'},
        {code: 'GR', label: 'Greece', phone: '30'},
        {
            code: 'GS',
            label: 'South Georgia and the South Sandwich Islands',
            phone: '500'
        },
        {code: 'GT', label: 'Guatemala', phone: '502'},
        {code: 'GU', label: 'Guam', phone: '1-671'},
        {code: 'GW', label: 'Guinea-Bissau', phone: '245'},
        {code: 'GY', label: 'Guyana', phone: '592'},
        {code: 'HK', label: 'Hong Kong', phone: '852'},
        {
            code: 'HM',
            label: 'Heard Island and McDonald Islands',
            phone: '672'
        },
        {code: 'HN', label: 'Honduras', phone: '504'},
        {code: 'HR', label: 'Croatia', phone: '385'},
        {code: 'HT', label: 'Haiti', phone: '509'},
        {code: 'HU', label: 'Hungary', phone: '36'},
        {code: 'ID', label: 'Indonesia', phone: '62'},
        {code: 'IE', label: 'Ireland', phone: '353'},
        {code: 'IL', label: 'Israel', phone: '972'},
        {code: 'IM', label: 'Isle of Man', phone: '44'},
        {code: 'IN', label: 'India', phone: '91'},
        {
            code: 'IO',
            label: 'British Indian Ocean Territory',
            phone: '246'
        },
        {code: 'IQ', label: 'Iraq', phone: '964'},
        {
            code: 'IR',
            label: 'Iran, Islamic Republic of',
            phone: '98'
        },
        {code: 'IS', label: 'Iceland', phone: '354'},
        {code: 'IT', label: 'Italy', phone: '39'},
        {code: 'JE', label: 'Jersey', phone: '44'},
        {code: 'JM', label: 'Jamaica', phone: '1-876'},
        {code: 'JO', label: 'Jordan', phone: '962'},
        {
            code: 'JP',
            label: 'Japan',
            phone: '81',
            suggested: true
        },
        {code: 'KE', label: 'Kenya', phone: '254'},
        {code: 'KG', label: 'Kyrgyzstan', phone: '996'},
        {code: 'KH', label: 'Cambodia', phone: '855'},
        {code: 'KI', label: 'Kiribati', phone: '686'},
        {code: 'KM', label: 'Comoros', phone: '269'},
        {
            code: 'KN',
            label: 'Saint Kitts and Nevis',
            phone: '1-869'
        },
        {
            code: 'KP',
            label: "Korea, Democratic People's Republic of",
            phone: '850'
        },
        {code: 'KR', label: 'Korea, Republic of', phone: '82'},
        {code: 'KW', label: 'Kuwait', phone: '965'},
        {code: 'KY', label: 'Cayman Islands', phone: '1-345'},
        {code: 'KZ', label: 'Kazakhstan', phone: '7'},
        {
            code: 'LA',
            label: "Lao People's Democratic Republic",
            phone: '856'
        },
        {code: 'LB', label: 'Lebanon', phone: '961'},
        {code: 'LC', label: 'Saint Lucia', phone: '1-758'},
        {code: 'LI', label: 'Liechtenstein', phone: '423'},
        {code: 'LK', label: 'Sri Lanka', phone: '94'},
        {code: 'LR', label: 'Liberia', phone: '231'},
        {code: 'LS', label: 'Lesotho', phone: '266'},
        {code: 'LT', label: 'Lithuania', phone: '370'},
        {code: 'LU', label: 'Luxembourg', phone: '352'},
        {code: 'LV', label: 'Latvia', phone: '371'},
        {code: 'LY', label: 'Libya', phone: '218'},
        {code: 'MA', label: 'Morocco', phone: '212'},
        {code: 'MC', label: 'Monaco', phone: '377'},
        {
            code: 'MD',
            label: 'Moldova, Republic of',
            phone: '373'
        },
        {code: 'ME', label: 'Montenegro', phone: '382'},
        {
            code: 'MF',
            label: 'Saint Martin (French part)',
            phone: '590'
        },
        {code: 'MG', label: 'Madagascar', phone: '261'},
        {code: 'MH', label: 'Marshall Islands', phone: '692'},
        {
            code: 'MK',
            label: 'Macedonia, the Former Yugoslav Republic of',
            phone: '389'
        },
        {code: 'ML', label: 'Mali', phone: '223'},
        {code: 'MM', label: 'Myanmar', phone: '95'},
        {code: 'MN', label: 'Mongolia', phone: '976'},
        {code: 'MO', label: 'Macao', phone: '853'},
        {
            code: 'MP',
            label: 'Northern Mariana Islands',
            phone: '1-670'
        },
        {code: 'MQ', label: 'Martinique', phone: '596'},
        {code: 'MR', label: 'Mauritania', phone: '222'},
        {code: 'MS', label: 'Montserrat', phone: '1-664'},
        {code: 'MT', label: 'Malta', phone: '356'},
        {code: 'MU', label: 'Mauritius', phone: '230'},
        {code: 'MV', label: 'Maldives', phone: '960'},
        {code: 'MW', label: 'Malawi', phone: '265'},
        {code: 'MX', label: 'Mexico', phone: '52'},
        {code: 'MY', label: 'Malaysia', phone: '60'},
        {code: 'MZ', label: 'Mozambique', phone: '258'},
        {code: 'NA', label: 'Namibia', phone: '264'},
        {code: 'NC', label: 'New Caledonia', phone: '687'},
        {code: 'NE', label: 'Niger', phone: '227'},
        {code: 'NF', label: 'Norfolk Island', phone: '672'},
        {code: 'NG', label: 'Nigeria', phone: '234'},
        {code: 'NI', label: 'Nicaragua', phone: '505'},
        {code: 'NL', label: 'Netherlands', phone: '31'},
        {code: 'NO', label: 'Norway', phone: '47'},
        {code: 'NP', label: 'Nepal', phone: '977'},
        {code: 'NR', label: 'Nauru', phone: '674'},
        {code: 'NU', label: 'Niue', phone: '683'},
        {code: 'NZ', label: 'New Zealand', phone: '64'},
        {code: 'OM', label: 'Oman', phone: '968'},
        {code: 'PA', label: 'Panama', phone: '507'},
        {code: 'PE', label: 'Peru', phone: '51'},
        {code: 'PF', label: 'French Polynesia', phone: '689'},
        {code: 'PG', label: 'Papua New Guinea', phone: '675'},
        {code: 'PH', label: 'Philippines', phone: '63'},
        {code: 'PK', label: 'Pakistan', phone: '92'},
        {code: 'PL', label: 'Poland', phone: '48'},
        {
            code: 'PM',
            label: 'Saint Pierre and Miquelon',
            phone: '508'
        },
        {code: 'PN', label: 'Pitcairn', phone: '870'},
        {code: 'PR', label: 'Puerto Rico', phone: '1'},
        {
            code: 'PS',
            label: 'Palestine, State of',
            phone: '970'
        },
        {code: 'PT', label: 'Portugal', phone: '351'},
        {code: 'PW', label: 'Palau', phone: '680'},
        {code: 'PY', label: 'Paraguay', phone: '595'},
        {code: 'QA', label: 'Qatar', phone: '974'},
        {code: 'RE', label: 'Reunion', phone: '262'},
        {code: 'RO', label: 'Romania', phone: '40'},
        {code: 'RS', label: 'Serbia', phone: '381'},
        {code: 'RU', label: 'Russian Federation', phone: '7'},
        {code: 'RW', label: 'Rwanda', phone: '250'},
        {code: 'SA', label: 'Saudi Arabia', phone: '966'},
        {code: 'SB', label: 'Solomon Islands', phone: '677'},
        {code: 'SC', label: 'Seychelles', phone: '248'},
        {code: 'SD', label: 'Sudan', phone: '249'},
        {code: 'SE', label: 'Sweden', phone: '46'},
        {code: 'SG', label: 'Singapore', phone: '65'},
        {code: 'SH', label: 'Saint Helena', phone: '290'},
        {code: 'SI', label: 'Slovenia', phone: '386'},
        {
            code: 'SJ',
            label: 'Svalbard and Jan Mayen',
            phone: '47'
        },
        {code: 'SK', label: 'Slovakia', phone: '421'},
        {code: 'SL', label: 'Sierra Leone', phone: '232'},
        {code: 'SM', label: 'San Marino', phone: '378'},
        {code: 'SN', label: 'Senegal', phone: '221'},
        {code: 'SO', label: 'Somalia', phone: '252'},
        {code: 'SR', label: 'Suriname', phone: '597'},
        {code: 'SS', label: 'South Sudan', phone: '211'},
        {
            code: 'ST',
            label: 'Sao Tome and Principe',
            phone: '239'
        },
        {code: 'SV', label: 'El Salvador', phone: '503'},
        {
            code: 'SX',
            label: 'Sint Maarten (Dutch part)',
            phone: '1-721'
        },
        {
            code: 'SY',
            label: 'Syrian Arab Republic',
            phone: '963'
        },
        {code: 'SZ', label: 'Swaziland', phone: '268'},
        {
            code: 'TC',
            label: 'Turks and Caicos Islands',
            phone: '1-649'
        },
        {code: 'TD', label: 'Chad', phone: '235'},
        {
            code: 'TF',
            label: 'French Southern Territories',
            phone: '262'
        },
        {code: 'TG', label: 'Togo', phone: '228'},
        {code: 'TH', label: 'Thailand', phone: '66'},
        {code: 'TJ', label: 'Tajikistan', phone: '992'},
        {code: 'TK', label: 'Tokelau', phone: '690'},
        {code: 'TL', label: 'Timor-Leste', phone: '670'},
        {code: 'TM', label: 'Turkmenistan', phone: '993'},
        {code: 'TN', label: 'Tunisia', phone: '216'},
        {code: 'TO', label: 'Tonga', phone: '676'},
        {code: 'TR', label: 'Turkey', phone: '90'},
        {
            code: 'TT',
            label: 'Trinidad and Tobago',
            phone: '1-868'
        },
        {code: 'TV', label: 'Tuvalu', phone: '688'},
        {
            code: 'TW',
            label: 'Taiwan, Republic of China',
            phone: '886'
        },
        {
            code: 'TZ',
            label: 'United Republic of Tanzania',
            phone: '255'
        },
        {code: 'UA', label: 'Ukraine', phone: '380'},
        {code: 'UG', label: 'Uganda', phone: '256'},
        {
            code: 'US',
            label: 'United States',
            phone: '1',
            suggested: true
        },
        {code: 'UY', label: 'Uruguay', phone: '598'},
        {code: 'UZ', label: 'Uzbekistan', phone: '998'},
        {
            code: 'VA',
            label: 'Holy See (Vatican City State)',
            phone: '379'
        },
        {
            code: 'VC',
            label: 'Saint Vincent and the Grenadines',
            phone: '1-784'
        },
        {code: 'VE', label: 'Venezuela', phone: '58'},
        {
            code: 'VG',
            label: 'British Virgin Islands',
            phone: '1-284'
        },
        {
            code: 'VI',
            label: 'US Virgin Islands',
            phone: '1-340'
        },
        {code: 'VN', label: 'Vietnam', phone: '84'},
        {code: 'VU', label: 'Vanuatu', phone: '678'},
        {code: 'WF', label: 'Wallis and Futuna', phone: '681'},
        {code: 'WS', label: 'Samoa', phone: '685'},
        {code: 'XK', label: 'Kosovo', phone: '383'},
        {code: 'YE', label: 'Yemen', phone: '967'},
        {code: 'YT', label: 'Mayotte', phone: '262'},
        {code: 'ZA', label: 'South Africa', phone: '27'},
        {code: 'ZM', label: 'Zambia', phone: '260'},
        {code: 'ZW', label: 'Zimbabwe', phone: '263'}
    ];
}