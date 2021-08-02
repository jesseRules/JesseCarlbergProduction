namespace JesseCarlbergProduction.Models
{
    /// <summary>
    /// Class AuthResponse.
    /// </summary>
    public class AuthResponse
    {
        /// <summary>
        /// Gets or sets a value indicating whether this instance is authentication successful.
        /// </summary>
        /// <value><c>true</c> if this instance is authentication successful; otherwise, <c>false</c>.</value>
        public bool IsAuthSuccessful { get; set; }

        /// <summary>
        /// Gets or sets the error message.
        /// </summary>
        /// <value>The error message.</value>
        public string ErrorMessage { get; set; }

        /// <summary>
        /// Gets or sets the token.
        /// </summary>
        /// <value>The token.</value>
        public string Token { get; set; }
    }
}