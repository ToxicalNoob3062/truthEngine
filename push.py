# used for pushing data rapidly.
import pymongo

# MongoDB connection URL
mongo_url = "mongodb+srv://rahat3062:sKCF4TD7TwK02sJK@todosdb.f3epagc.mongodb.net/TruthEngine?retryWrites=true&w=majority&appName=TodosDB"

# Connect to MongoDB
client = pymongo.MongoClient(mongo_url)
db = client["TruthEngine"]
collection = db["User"]

# User data
users = [
    {"name": "Rahat Bin Taleb", "email": "rahat3062@gmail.com"},
    {"name": "FRIENDS & BEYOND", "email": "chicks4056@gmail.com"},
    {"name": "Rasheesh cringy", "email": "boruto1234567uzumaki@gmail.com"},
    {"name": "Rohan Hossain", "email": "codingclubgenuis@gmail.com"},
    {"name": "MD. Ismail Hossain", "email": "ih02234@gmail.com"},
    {"name": "Sheikh Muhammad", "email": "sheikhmuhammad7676@gmail.com"},
    {"name": "yeasin habib", "email": "yeasinhabib1994@gmail.com"},
    {"name": "Foogi", "email": "thisguywon@gmail.com"},
    {"name": "naim mustakim", "email": "naimmustakim82@gmail.com"},
    {"name": "Nabid Mostakim", "email": "nabidmostakim@gmail.com"},
    {"name": "Felix Pherry", "email": "123felixpherry@gmail.com"},
    {"name": "Aissatou Barry", "email": "aissatou.bbarry226@gmail.com"},
    {"name": "Maqsud Developer", "email": "maqsudbektolipov@gmail.com"},
    {"name": "Nader Ezzat", "email": "nader.gergues@gmail.com"},
    {"name": "Abir Mahmud", "email": "abirmahmud104@gmail.com"},
    {"name": "Ryan Zhu", "email": "ryanzhuturtle@gmail.com"},
    {"name": "Cheater Fox", "email": "zlatislavvz@gmail.com"},
    {"name": "Ajagbe Opeyemi", "email": "ajagbeopeyemi10001@gmail.com"},
    {"name": "Edwin Ngui", "email": "edwin.nguim@gmail.com"},
    {"name": "Ruben Dev", "email": "dev.ruben.costa@gmail.com"},
    {"name": "Dani Lynx", "email": "danilynx145@gmail.com"},
    {"name": "Mohammad Majd", "email": "mmh10417@gmail.com"},
    {"name": "Tarek", "email": "tarek.i.sallam@gmail.com"},
    {"name": "Shakil Muhammad", "email": "shakilmuhammad2002@gmail.com"},
    {"name": "dfgh fgd", "email": "okaychamp262@gmail.com"},
    {"name": "Reuben Sonnenberg", "email": "comedyrotten@gmail.com"},
    {"name": "Naruto Uzu", "email": "narutoget2004@gmail.com"},
    {"name": "aban hasan", "email": "abanpersonal@gmail.com"},
    {"name": "Harman Singh Ahluwalia", "email": "harmansinghahluwalia26@gmail.com"},
    {"name": "GamerZ Group (Wicked Gamer)", "email": "gamerzgroup.or3@gmail.com"},
    {"name": "Dylan Linus Sy", "email": "dylanlinussy@gmail.com"},
    {"name": "Rohit Kushwaha", "email": "technicalrohit06@gmail.com"},
    {"name": "Muhammad Samin", "email": "samin031981@gmail.com"},
    {"name": "LTTstore Twitter", "email": "lttstoretwitter@gmail.com"},
    {"name": "hydra bhai", "email": "bhydra824@gmail.com"},
    {"name": "Vikas Vitekari", "email": "vikidada2001@gmail.com"},
    {"name": "christopher bates", "email": "chrisoxygen1234@gmail.com"},
    {"name": "Nico Baier", "email": "nico.baier@gmail.com"},
    {"name": "mrhza1234 khnn", "email": "mrzakhnn@gmail.com"},
    {"name": "Amar nath", "email": "servethroughtech@gmail.com"},
    {"name": "Syed Raghib Ishraq", "email": "raghibishraq80@gmail.com"},
    {"name": "Parit Bhardwaj", "email": "avdheshbhardwaj999@gmail.com"},
    {"name": "Farah Habib", "email": "chanchary@gmail.com"},
    {"name": "Himanshu Rawat", "email": "himanshurw56@gmail.com"},
    {"name": "Abraham Hsu", "email": "smokiebacon@gmail.com"},
    {"name": "Elias Salmi", "email": "eliasrsalmi@googlemail.com"},
    {"name": "Aadarsh", "email": "thisisaadarshkumar@gmail.com"},
    {"name": "john burrows", "email": "jburrows276@gmail.com"},
    {"name": "Bablo One", "email": "babloone584@gmail.com"},
    {"name": "Mad Kain", "email": "sirawesomelord@gmail.com"},
    {"name": "Kerim Karaman", "email": "kerim282841@gmail.com"},
    {"name": "Rauf Garayev", "email": "rafkagarayev@gmail.com"},
    {"name": "K Rajk", "email": "krajk08031996@gmail.com"},
    {"name": "Gabriel Freiberg", "email": "gabefreiberg@gmail.com"},
    {"name": "Richard Seward", "email": "raseward14@gmail.com"},
    {"name": "Ou Xiao Ne", "email": "xiaoneou@gmail.com"},
    {"name": "Sourav Shaw", "email": "souravstudent0@gmail.com"},
    {"name": "Arpit Tyagi", "email": "arpittyagi0000@gmail.com"},
    {"name": "Bowen Zhang", "email": "bowenzhang141@gmail.com"},
    {"name": "Tway Wandiky", "email": "twaywandiky@gmail.com"},
    {"name": "Boyan Gyurov", "email": "bobigurov36@gmail.com"},
    {"name": "Rahul Rajput", "email": "rr6113051@gmail.com"},
    {"name": "panda ji", "email": "jipanda48@gmail.com"},
    {"name": "Alochan Ch", "email": "philipchaudhary190@gmail.com"},
    {"name": "Fearless Straw", "email": "fearlessstraw@gmail.com"},
    {"name": "g radio", "email": "gmharvard902@gmail.com"},
    {"name": "JEE Oracle", "email": "jeeoracle@gmail.com"}
]

# Insert user data into the User collection
result = collection.insert_many(users)
print(f"Inserted {len(result.inserted_ids)} documents into the User collection.")