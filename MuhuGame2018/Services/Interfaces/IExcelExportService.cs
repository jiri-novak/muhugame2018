using MuhuGame2018.Entities;
using System.Collections.Generic;
using System.IO;

namespace MuhuGame2018.Services.Interfaces
{
    public interface IExcelExportService
    {
        Stream Export(IEnumerable<User> users);
    }
}
