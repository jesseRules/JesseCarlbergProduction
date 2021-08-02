using JesseCarlbergProduction.Interfaces;
using JesseCarlbergProduction.Models;
using MongoDB.Driver;
using System.Linq;

namespace JesseCarlbergProduction.Services
{
    public class ContactService: IContactService
    {
        private readonly IMongoCollection<ContactModel> _contacts;

        public ContactService(IContactDBSettingsModel settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _contacts = database.GetCollection<ContactModel>(settings.ContactCollectionName);
        }

        public ContactModel Get(string id) =>
        _contacts.Find<ContactModel>(contact => contact.Id == id).FirstOrDefault();

        public ContactModel Create(ContactModel contact)
        {
            _contacts.InsertOne(contact);
            return contact;
        }
    }
}