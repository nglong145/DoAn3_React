using DataAccessLayer.Helper;
using DataAccessLayer;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using BusinessLogicLayer.Interfaces;
using BussinessLogicLayer.Interfaces;
using BussinessLogicLayer;
using DataAccessLayer.Interfaces;

namespace User
{
    public class Startup
    {
        public Startup(IWebHostEnvironment env)
        {
            var builder = new ConfigurationBuilder()
               .SetBasePath(env.ContentRootPath)
               .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
               .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
               .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();
            services.AddControllers();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Trang USER", Version = "v1" });
            });


            // configure strongly typed settings objects
            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);

            // configure jwt authentication
            var appSettings = appSettingsSection.Get<AppSettings>();
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

            services.AddControllers();
            services.AddTransient<IDatabaseHelper, DatabaseHelper>();
            services.AddTransient<IBlogRepository, BlogRepository>();
            services.AddTransient<IBlogBussiness, BlogBussiness>();
            services.AddTransient<IBrandRepository, BrandRepository>();
            services.AddTransient<IBrandBussiness, BrandBussiness>();
            services.AddTransient<ICategoryRepository, CategoryRepository>();
            services.AddTransient<ICategoryBussiness, CategoryBussiness>();
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<IUserBussiness, UserBussiness>();
            services.AddTransient<IProductRepository, ProductRepository>();
            services.AddTransient<IProductBussiness, ProductBussiness>();
            services.AddTransient<IReviewRepository, ReviewRepository>();
            services.AddTransient<IReviewBussiness, ReviewBussiness>();
            services.AddTransient<ICartRepository, CartRepository>();
            services.AddTransient<ICartBussiness, CartBussiness>();
            services.AddTransient<IOrderRepository, OrderRepository>();
            services.AddTransient<IOrderBussiness, OrderBussiness>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseRouting();
            // global cors policy
            app.UseCors(x => x
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());

            app.UseAuthentication();
            app.UseAuthorization();

            //app.UseEndpoints(endpoints => {
            //    endpoints.MapControllerRoute(
            //        name: "default",
            //        pattern: "{controller=Item}/{action=GetDatabAll}/{id?}");
            //});


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("https://localhost:44359/swagger/v1/swagger.json", "Trang USER v1"));
            });
        }
    }
}
