CREATE DATABASE `contatcs_management`;
USE contatcs_management;

CREATE TABLE `users` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(50) UNIQUE NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `contacts` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `phone` VARCHAR(15) NOT NULL,
  `id_country` INT NOT NULL,
  `id_user` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `countries` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `iso_name` VARCHAR(3),
  `phone_code` VARCHAR(5),
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE `contacts` ADD FOREIGN KEY (`id_user`) REFERENCES `users` (`id`);

ALTER TABLE `contacts` ADD FOREIGN KEY (`id_country`) REFERENCES `countries` (`id`);

/*
	Populating the user table
*/
INSERT INTO users
  (email, password)
VALUES
  ('user1@example.com', 'o9$Lvp4MO%'),
  ('user2@example.com', 'A7#SLqbGm^'),
  ('user3@example.com', 'q5^jZ5$H!y');

/*
	Populating the countries table
*/
INSERT INTO countries
	(name, iso_name, phone_code)
VALUES
  ('Afghanistan','AFG','0'),
  ('Albania','ALB','355'),
  ('Germany','DEU','49'),
  ('Algeria','DZA','213'),
  ('Andorra','AND','376'),
  ('Angola','AGO','244'),
  ('Anguilla','AIA','1-264'),
  ('Antarctica','ATA','672'),
  ('Antigua-and-Barbuda','ATG','1-268'),
  ('Netherlands-Antilles','ANT','599'),
  ('Saudi-Arabia','SAU','966'),
  ('Argentina','ARG','54'),
  ('Armenia','ARM','374'),
  ('Aruba','ABW','297'),
  ('Australia','AUS','61'),
  ('Austria','AUT','43'),
  ('Azerbaijan','AZE','994'),
  ('Bahamas','BHS','1-242'),
  ('Bahrain','BHR','973'),
  ('Bangladesh','BGD','880'),
  ('Barbados','BRB','1-246'),
  ('Belgium','BEL','32'),
  ('Belize','BLZ','501'),
  ('Benin','BEN','229'),
  ('Bhutan','BTN','975'),
  ('Belarus','BLR','375'),
  ('Myanmar','MMR','95'),
  ('Bolivia','BOL','591'),
  ('Bosnia-and-Herzegovina','BIH','387'),
  ('Botswana','BWA','267'),
  ('Brazil','BRA','55'),
  ('Brunei','BRN','673'),
  ('Bulgaria','BGR','359'),
  ('Burkina-Faso','BFA','226'),
  ('Burundi','BDI','257'),
  ('Cape-Verde','CPV','238'),
  ('Cambodia','KHM','855'),
  ('Cameroon','CMR','237'),
  ('Canada','CAN','1'),
  ('Chad','TCD','235'),
  ('Chile','CHL','56'),
  ('China','CHN','86'),
  ('Cyprus','CYP','357'),
  ('Vatican-City-State','VAT','39'),
  ('Colombia','COL','57'),
  ('Comoros','COM','269'),
  ('Congo','COG','242'),
  ('Congo','COD','243'),
  ('North-Korea','PRK','850'),
  ('South-Korea','KOR','82'),
  ('Ivory-Coast','CIV','225'),
  ('Costa-Rica','CRI','506'),
  ('Croatia','HRV','385'),
  ('Cuba','CUB','53'),
  ('Denmark','DNK','45'),
  ('Dominica','DMA','1-767'),
  ('Ecuador','ECU','593'),
  ('Egypt','EGY','20'),
  ('El-Salvador','SLV','503'),
  ('United-Arab-Emirates','ARE','971'),
  ('Eritrea','ERI','291'),
  ('Scotland','','44'),
  ('Slovakia','SVK','421'),
  ('Slovenia','SVN','386'),
  ('Spain','ESP','34'),
  ('United-States-of-America','USA','1'),
  ('Estonia','EST','372'),
  ('Ethiopia','ETH','251'),
  ('Philippines','PHL','63'),
  ('Finland','FIN','358'),
  ('Fiji','FJI','679'),
  ('France','FRA','33'),
  ('Gabon','GAB','241'),
  ('Wales','','44'),
  ('Gambia','GMB','220'),
  ('Georgia','GEO','995'),
  ('Ghana','GHA','233'),
  ('Gibraltar','GIB','350'),
  ('Grenada','GRD','1-473'),
  ('Greece','GRC','30'),
  ('Greenland','GRL','299'),
  ('Guadeloupe','GLP',''),
  ('Guam','GUM','1-671'),
  ('Guatemala','GTM','502'),
  ('French-Guiana','GUF',''),
  ('Guernsey','GGY',''),
  ('Guinea','GIN','224'),
  ('Equatorial-Guinea','GNQ','240'),
  ('Guinea-Bissau','GNB','245'),
  ('Guyana','GUY','592'),
  ('Haiti','HTI','509'),
  ('Honduras','HND','504'),
  ('Hong-Kong','HKG','852'),
  ('Hungary','HUN','36'),
  ('India','IND','91'),
  ('Indonesia','IDN','62'),
  ('England','','44'),
  ('Iraq','IRQ','964'),
  ('Iran','IRN','98'),
  ('Ireland','IRL','353'),
  ('Northern-Irland','','44'),
  ('Bouvet-Island','BVT',''),
  ('Isle-of-Man','IMN','44'),
  ('Christmas-Island','CXR','61'),
  ('Norfolk-Island','NFK',''),
  ('Iceland','ISL','354'),
  ('Bermuda-Islands','BMU','1-441'),
  ('Cayman-Islands','CYM','1-345'),
  ('Cocos-(Keeling)-Islands','CCK','61'),
  ('Cook-Islands','COK','682'),
  ('Åland-Islands','ALA',''),
  ('Faroe-Islands','FRO','298'),
  ('South-Georgia-and-the-South-Sandwich-Islands','SGS',''),
  ('Heard-Island-and-McDonald-Islands','HMD',''),
  ('Maldives','MDV','960'),
  ('Falkland-Islands-(Malvinas)','FLK','500'),
  ('Northern-Mariana-Islands','MNP','1-670'),
  ('Marshall-Islands','MHL','692'),
  ('Pitcairn-Islands','PCN','870'),
  ('Solomon-Islands','SLB','677'),
  ('Turks-and-Caicos-Islands','TCA','1-649'),
  ('United-States-Minor-Outlying-Islands','UMI',''),
  ('Virgin-Islands','VG','1-284'),
  ('United-States-Virgin-Islands','VIR','1-340'),
  ('Israel','ISR','972'),
  ('Italy','ITA','39'),
  ('Jamaica','JAM','1-876'),
  ('Japan','JPN','81'),
  ('Jersey','JEY',''),
  ('Jordan','JOR','962'),
  ('Kazakhstan','KAZ','7'),
  ('Kenya','KEN','254'),
  ('Kyrgyzstan','KGZ','996'),
  ('Kiribati','KIR','686'),
  ('Kuwait','KWT','965'),
  ('Laos','LAO','856'),
  ('Lesotho','LSO','266'),
  ('Latvia','LVA','371'),
  ('Lebanon','LBN','961'),
  ('Liberia','LBR','231'),
  ('Libya','LBY','218'),
  ('Liechtenstein','LIE','423'),
  ('Lithuania','LTU','370'),
  ('Luxembourg','LUX','352'),
  ('Macao','MAC','853'),
  ('Macedonia','MKD','389'),
  ('Madagascar','MDG','261'),
  ('Malaysia','MYS','60'),
  ('Malawi','MWI','265'),
  ('Mali','MLI','223'),
  ('Malta','MLT','356'),
  ('Morocco','MAR','212'),
  ('Martinique','MTQ',''),
  ('Mauritius','MUS','230'),
  ('Mauritania','MRT','222'),
  ('Mayotte','MYT','262'),
  ('Mexico','MEX','52'),
  ('Estados-Federados-de','FSM','691'),
  ('Moldova','MDA','373'),
  ('Monaco','MCO','377'),
  ('Mongolia','MNG','976'),
  ('Montenegro','MNE','382'),
  ('Montserrat','MSR','1-664'),
  ('Mozambique','MOZ','258'),
  ('Namibia','NAM','264'),
  ('Nauru','NRU','674'),
  ('Nepal','NPL','977'),
  ('Nicaragua','NIC','505'),
  ('Niger','NER','227'),
  ('Nigeria','NGA','234'),
  ('Niue','NIU','683'),
  ('Norway','NOR','47'),
  ('New-Caledonia','NCL','687'),
  ('New-Zealand','NZL','64'),
  ('Oman','OMN','968'),
  ('Netherlands','NLD','31'),
  ('Pakistan','PAK','92'),
  ('Palau','PLW','680'),
  ('Palestine','PSE',''),
  ('Panama','PAN','507'),
  ('Papua-New-Guinea','PNG','675'),
  ('Paraguay','PRY','595'),
  ('Peru','PER','51'),
  ('French-Polynesia','PYF','689'),
  ('Poland','POL','48'),
  ('Portugal','PRT','351'),
  ('Puerto-Rico','PRI','1'),
  ('Qatar','QAT','974'),
  ('United-Kingdom','GBR','44'),
  ('Central-African-Republic','CAF','236'),
  ('Czech-Republic','CZE','420'),
  ('Dominican-Republic','DOM','1-809'),
  ('Réunion','REU',''),
  ('Rwanda','RWA','250'),
  ('Romania','ROU','40'),
  ('Russia','RUS','7'),
  ('Western-Sahara','ESH',''),
  ('Samoa','WSM','685'),
  ('American-Samoa','ASM','1-684'),
  ('Saint-Barthélemy','BLM','590'),
  ('Saint-Kitts-and-Nevis','KNA','1-869'),
  ('San-Marino','SMR','378'),
  ('Saint-Martin-(French-part)','MAF','1-599'),
  ('Saint-Pierre-and-Miquelon','SPM','508'),
  ('Saint-Vincent-and-the-Grenadines','VCT','1-784'),
  ('Ascensión-y-Tristán-de-Acuña','SHN','290'),
  ('Saint-Lucia','LCA','1-758'),
  ('Sao-Tome-and-Principe','STP','239'),
  ('Senegal','SEN','221'),
  ('Serbia','SRB','381'),
  ('Seychelles','SYC','248'),
  ('Sierra-Leone','SLE','232'),
  ('Singapore','SGP','65'),
  ('Syria','SYR','963'),
  ('Somalia','SOM','252'),
  ('Sri-Lanka','LKA','94'),
  ('South-Africa','ZAF','27'),
  ('Sudan','SDN','249'),
  ('Sweden','SWE','46'),
  ('Switzerland','CHE','41'),
  ('Suriname','SUR','597'),
  ('Svalbard-and-Jan-Mayen','SJM',''),
  ('Swaziland','SWZ','268'),
  ('Tajikistan','TJK','992'),
  ('Thailand','THA','66'),
  ('Taiwan','TWN','886'),
  ('Tanzania','TZA','255'),
  ('British-Indian-Ocean-Territory','IOT',''),
  ('French-Southern-Territories','ATF',''),
  ('East-Timor','TLS','670'),
  ('Togo','TGO','228'),
  ('Tokelau','TKL','690'),
  ('Tonga','TON','676'),
  ('Trinidad-and-Tobago','TTO','1-868'),
  ('Tunisia','TUN','216'),
  ('Turkmenistan','TKM','993'),
  ('Turkey','TUR','90'),
  ('Tuvalu','TUV','688'),
  ('Ukraine','UKR','380'),
  ('Uganda','UGA','256'),
  ('Uruguay','URY','598'),
  ('Uzbekistan','UZB','998'),
  ('Vanuatu','VUT','678'),
  ('Venezuela','VEN','58'),
  ('Vietnam','VNM','84'),
  ('Wallis-and-Futuna','WLF','681'),
  ('Yemen','YEM','967'),
  ('Djibouti','DJI','253'),
  ('Zambia','ZMB','260'),
  ('Zimbabwe','ZWE','263');