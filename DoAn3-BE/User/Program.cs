using BusinessLogicLayer;
using DataAccessLayer.Helper;
using DataAccessLayer.Interfaces;
using DataAccessLayer;
using BusinessLogicLayer.Interfaces;
using BussinessLogicLayer;
using BussinessLogicLayer.Interfaces;
using User;

public class Program
{
    public static void Main(string[] args)
    {
        CreateHostBuilder(args).Build().Run();
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseStartup<Startup>();
            });
}