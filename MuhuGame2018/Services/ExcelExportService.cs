using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Globalization;
using System.IO;
using System.Linq;
using Microsoft.Extensions.Options;
using MuhuGame2018.Entities;
using MuhuGame2018.Helpers;
using MuhuGame2018.Services.Interfaces;
using OfficeOpenXml;

namespace MuhuGame2018.Services
{
    public class ExcelExportService : IExcelExportService
    {
        private readonly IOptions<AppSettings> _options;

        public ExcelExportService(IOptions<AppSettings> options)
        {
            _options = options;
        }

        public Stream Export(IEnumerable<User> users)
        {
            using (var excelPackage = new ExcelPackage())
            {
                var ws = excelPackage.Workbook.Worksheets.Add("MG2018");

                var data = users.Select(x => {
                    var m1 = x.Members.Skip(0).Take(1).FirstOrDefault();
                    var m2 = x.Members.Skip(1).Take(1).FirstOrDefault();
                    var m3 = x.Members.Skip(2).Take(1).FirstOrDefault();
                    var m4 = x.Members.Skip(3).Take(1).FirstOrDefault();

                    var costs = LodgingValidator.CalculateCosts(_options, x);

                    return new DataRow
                    {
                        Name = x.Name,
                        Email = x.Email,
                        Telephone = x.Telephone,
                        Variant = x.Variant,
                        Note = x.Note,
                        RegistrationDate = x.RegistrationDate.ToString(CultureInfo.InvariantCulture),
                        Paid = x.Paid ? "Ano" : "Ne",
                        Quited = x.Quited ? "Ano" : "Ne",
                        Cost = costs.TotalCost,

                        M1_Name = m1.Name,
                        M1_Tshirt = m1.Tshirt,
                        M1_Dinner1 = m1.Dinner1,
                        M1_Dinner2 = m1.Dinner2,
                        M1_Cost = m1.Cost,

                        M2_Name = m2.Name,
                        M2_Tshirt = m2.Tshirt,
                        M2_Dinner1 = m2.Dinner1,
                        M2_Dinner2 = m2.Dinner2,
                        M2_Cost = m2.Cost,

                        M3_Name = m3.Name,
                        M3_Tshirt = m3.Tshirt,
                        M3_Dinner1 = m3.Dinner1,
                        M3_Dinner2 = m3.Dinner2,
                        M3_Cost = m3.Cost,

                        M4_Name = m4.Name,
                        M4_Tshirt = m4.Tshirt,
                        M4_Dinner1 = m4.Dinner1,
                        M4_Dinner2 = m4.Dinner2,
                        M4_Cost = m4.Cost,
                    };
                });

                ws.Cells.LoadFromCollection(data, true, OfficeOpenXml.Table.TableStyles.Light15);
                
                return new MemoryStream(excelPackage.GetAsByteArray());
            }
        }

        public class DataRow
        {
            [Description("Jméno")]
            public string Name { get; set; }
            [Description("Email")]
            public string Email { get; set; }
            [Description("Telefon")]
            public string Telephone { get; set; }
            [Description("Ubytování")]
            public string Variant { get; set; }
            [Description("Poznámka")]
            public string Note { get; set; }
            [Description("Datum registrace")]
            public string RegistrationDate { get; set; }
            [Description("Zaplatili")]
            public string Paid { get; set; }
            [Description("Vzdali")]
            public string Quited { get; set; }
            [Description("Cena")]
            public int Cost { get; set; } 

            [Description("1. Jméno")]
            public string M1_Name { get; set; }
            [Description("1. Tričko")]
            public string M1_Tshirt { get; set; }
            [Description("1. Večeře (pátek)")]
            public string M1_Dinner1 { get; set; }
            [Description("1. Večeře (sobota)")]
            public string M1_Dinner2 { get; set; }
            [Description("1. Cena")]
            public int M1_Cost { get; set; }

            [Description("2. Jméno")]
            public string M2_Name { get; set; }
            [Description("2. Tričko")]
            public string M2_Tshirt { get; set; }
            [Description("2. Večeře (pátek)")]
            public string M2_Dinner1 { get; set; }
            [Description("2. Večeře (sobota)")]
            public string M2_Dinner2 { get; set; }
            [Description("2. Cena")]
            public int M2_Cost { get; set; }

            [Description("3. Jméno")]
            public string M3_Name { get; set; }
            [Description("3. Tričko")]
            public string M3_Tshirt { get; set; }
            [Description("3. Večeře (pátek)")]
            public string M3_Dinner1 { get; set; }
            [Description("3. Večeře (sobota)")]
            public string M3_Dinner2 { get; set; }
            [Description("3. Cena")]
            public int M3_Cost { get; set; }

            [Description("4. Jméno")]
            public string M4_Name { get; set; }
            [Description("4. Tričko")]
            public string M4_Tshirt { get; set; }
            [Description("4. Večeře (pátek)")]
            public string M4_Dinner1 { get; set; }
            [Description("4. Večeře (sobota)")]
            public string M4_Dinner2 { get; set; }
            [Description("4. Cena")]
            public int M4_Cost { get; set; }
        }
    }
}
