using JesseCarlbergProduction.Models;

namespace JesseCarlbergProduction.Interfaces
{
    public interface IContactService
    {
        public ContactModel Get(string id);
        public ContactModel Create(ContactModel contact);
    }
}