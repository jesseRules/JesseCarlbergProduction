using JesseCarlbergProduction.Interfaces;
using JesseCarlbergProduction.Models;
using JesseCarlbergProduction.Models.Twitter;
using JesseCarlbergProduction.Services;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System;
using System.Globalization;
using System.IO;
using System.Reflection;
using System.Text;

namespace JesseCarlbergProduction
{
    /// <summary>
    /// Class Startup.
    /// </summary>
    public class Startup
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="Startup"/> class.
        /// </summary>
        /// <param name="configuration">The configuration.</param>
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        /// <summary>
        /// Gets the configuration.
        /// </summary>
        /// <value>The configuration.</value>
        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        /// <summary>
        /// Configures the services.
        /// </summary>
        /// <param name="services">The services.</param>
        public void ConfigureServices(IServiceCollection services)
        {
            // For Entity Framework
            services.AddDbContext<ApplicationDBContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            // For Identity
            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDBContext>()
                .AddDefaultTokenProviders();

            // Adding antiforgery
            services.AddAntiforgery(options =>
            {
                options.HeaderName = "X-XSRF-TOKEN";
            });
            services.AddMvc();

            // Adding Authentication
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            // Adding Jwt Bearer
            .AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.RequireHttpsMetadata = false;
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidAudience = Configuration["JWT:ValidAudience"],
                    ValidIssuer = Configuration["JWT:ValidIssuer"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JWT:Secret"]))
                };
            });

            services.Configure<IdentityOptions>(options =>
            {
                // Default Lockout settings.
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
                options.Lockout.MaxFailedAccessAttempts = 5;
                options.Lockout.AllowedForNewUsers = true;
                options.SignIn.RequireConfirmedEmail = true;
                options.SignIn.RequireConfirmedPhoneNumber = false;
                options.Password.RequireDigit = true;
                options.Password.RequireLowercase = true;
                options.Password.RequireNonAlphanumeric = true;
                options.Password.RequireUppercase = true;
                options.Password.RequiredLength = 6;
                options.User.RequireUniqueEmail = true;
            });

            // requires
            // using Microsoft.AspNetCore.Identity.UI.Services;
            // using WebPWrecover.Services;
            services.AddTransient<IEmailService, EmailService>();
            services.Configure<AuthMessageSenderOptions>(Configuration);

            services.Configure<AuthMessageSenderOptions>(
            Configuration.GetSection(nameof(AuthMessageSenderOptions)));

            services.AddSingleton<EmailService>();

            services.AddTransient<ITwitterService, TwitterService>();
            services.Configure<TwitterConnectionSettings>(
            Configuration.GetSection(nameof(TwitterConnectionSettings)));
            services.AddSingleton<TwitterService>();

            services.AddTransient<ITwitter2Service, Twitter2Service>();
            services.AddSingleton<Twitter2Service>();

            // Adding in Blog Service with Connection Strings
            services.Configure<BlogDBSettingsModel>(
                Configuration.GetSection(nameof(BlogDBSettingsModel)));


            services.AddTransient<IBlogService, BlogService>();

            services.AddSingleton<IBlogDBSettingsModel>(sp =>
                sp.GetRequiredService<IOptions<BlogDBSettingsModel>>().Value);

            services.AddSingleton<BlogService>();

            // Adding in Contact Me Service with Connection Strings
            services.Configure<ContactDBSettingsModel>(
                Configuration.GetSection(nameof(ContactDBSettingsModel)));

            services.AddSingleton<IContactDBSettingsModel>(sp =>
                sp.GetRequiredService<IOptions<ContactDBSettingsModel>>().Value);

            services.AddTransient<IContactService, ContactService>();
            services.AddSingleton<ContactService>();

            // Adding in Blog Subscription Service with Connection Strings
            services.Configure<SubscriptionDBSettingsModel>(
                Configuration.GetSection(nameof(SubscriptionDBSettingsModel)));

            services.AddSingleton<ISubscriptionDBSettingsModel>(sp =>
                sp.GetRequiredService<IOptions<SubscriptionDBSettingsModel>>().Value);

            services.AddTransient<ISubscriptionsService, SubscriptionsService>();
            services.AddSingleton<SubscriptionsService>();

            // Adding in AZ Image Service with Connection Strings
            services.Configure<AzureStorageConfig>(
                Configuration.GetSection(nameof(AzureStorageConfig)));

            services.AddSingleton<IAzureStorageConfig>(sp =>
                sp.GetRequiredService<IOptions<AzureStorageConfig>>().Value);

            services.AddTransient<IPhotoService, PhotoService>();
            services.AddSingleton<PhotoService>();

            services.AddControllers()
          .AddJsonOptions(opts => opts.JsonSerializerOptions.PropertyNamingPolicy = null);

            services.AddCors(options =>
            {
                options.AddPolicy("CorsApi",
                    builder => builder.WithOrigins("https://localhost:44351", "https://localhost:44304", "https://jessecarlbergproduction.com/", "https://jesserules.azurewebsites.net/")
                .AllowAnyHeader()
                .AllowAnyMethod());
            });

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist/jesseRules";
            });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "Jesse Carlberg Production",
                    Version = "v1",
                    Description = "New .NetCore",
                    Contact = new OpenApiContact
                    {
                        Name = "Jesse Carlberg Production",
                        Email = "jesse@jessecarlbergprodcution.com",
                        // Url = new Uri("http://localhost:5000"),
                    },
                });

                // Bearer token authentication
                OpenApiSecurityScheme securityDefinition = new()
                {
                    Name = "Bearer",
                    BearerFormat = "JWT",
                    Scheme = "bearer",
                    Description = "Specify the authorization token.",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                };
                c.AddSecurityDefinition("jwt_auth", securityDefinition);

                // Make sure swagger UI requires a Bearer token specified
                OpenApiSecurityScheme securityScheme = new()
                {
                    Reference = new OpenApiReference()
                    {
                        Id = "jwt_auth",
                        Type = ReferenceType.SecurityScheme
                    }
                };
                OpenApiSecurityRequirement securityRequirements = new()
                {
                    { securityScheme, Array.Empty<string>() },
                };
                c.AddSecurityRequirement(securityRequirements);

                // Set the comments path for the Swagger JSON and UI.
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        /// <summary>
        /// Configures the specified application.
        /// </summary>
        /// <param name="app">The application.</param>
        /// <param name="env">The env.</param>
        /// <param name="antiforgery">The antiforgery.</param>
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IAntiforgery antiforgery)
        {
            app.Use(next => context =>
            {
                string path = context.Request.Path.Value;
                if (path != null && !path.ToLower(CultureInfo.CurrentCulture).Contains("/api"))
                {
                    // XSRF-TOKEN used by angular in the $http if provided
                    var tokens = antiforgery.GetAndStoreTokens(context);
                    context.Response.Cookies.Append("XSRF-TOKEN",
                      tokens.RequestToken, new CookieOptions
                      {
                          HttpOnly = false,
                          Secure = true
                      }
                    );
                }
                return next(context);
            });

            //Load Swagger
            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "JCProductionAPI v1"));

            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();
            app.UseCors("CorsApi");
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    // Live reload not working for .net5 and ng11 for now,
                    // see https://github.com/dotnet/aspnetcore/issues/29478
                    spa.UseAngularCliServer(npmScript: "start");
                    spa.Options.StartupTimeout = TimeSpan.FromSeconds(180); // Increase the timeout if angular app is taking longer to startup
                    //spa.UseProxyToSpaDevelopmentServer("http://localhost:4200"); // Use this instead to use the angular cli server
                }
            });
        }
    }
}