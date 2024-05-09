module {
  public type GetTransactionError = {
    #invalidTransaction;
    #unsupportedResponse;
  };

  public type InsertTransactionError = {
    #invalidTransaction;
    #unsupportedResponse;
  };

  public type GetAllTransactionError= {
    #unsupportedResponse;
    #notransactionfound;
  };

}