'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Download, Filter, Search, Eye, MessageSquare, Calendar, Headphones, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { apiClient, Lead } from '@/lib/api';
import Link from 'next/link';

const useCaseIcons = {
  SALES: MessageSquare,
  APPT: Calendar,
  SUPPORT: Headphones,
};

const useCaseColors = {
  SALES: 'bg-blue-100 text-blue-800',
  APPT: 'bg-green-100 text-green-800',
  SUPPORT: 'bg-orange-100 text-orange-800',
};

const statusIcons = {
  NEW: Clock,
  SEEN: Eye,
  REPLIED: CheckCircle,
};

const statusColors = {
  NEW: 'bg-red-100 text-red-800',
  SEEN: 'bg-yellow-100 text-yellow-800',
  REPLIED: 'bg-green-100 text-green-800',
};

export default function InboxPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    useCase: '',
    status: '',
    search: '',
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0,
  });

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await apiClient.getLeads(
        pagination.page,
        pagination.limit,
        {
          useCase: filters.useCase || undefined,
          status: filters.status || undefined,
          search: filters.search || undefined,
        }
      );

      if (response.success) {
        setLeads(response.data.leads);
        setPagination(response.data.pagination);
      }
    } catch (error) {
      console.error('Failed to fetch leads:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [pagination.page, filters.useCase, filters.status, filters.search]);

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    try {
      const response = await apiClient.updateLeadStatus(leadId, newStatus);
      if (response.success) {
        setLeads(leads.map(lead => 
          lead.id === leadId ? { ...lead, status: newStatus } : lead
        ));
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleExport = async () => {
    try {
      const blob = await apiClient.exportLeads();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'leads.csv';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Failed to export leads:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getLeadTitle = (lead: Lead) => {
    const payload = lead.payload;
    switch (lead.useCase) {
      case 'SALES':
        return `${payload.company || 'Unknown Company'} - ${payload.name || 'Unknown'}`;
      case 'APPT':
        return `${payload.serviceType || 'Service'} - ${payload.name || 'Unknown'}`;
      case 'SUPPORT':
        return `${payload.productArea || 'Product'} Issue - ${payload.email || 'Unknown'}`;
      default:
        return 'Unknown Lead';
    }
  };

  const getLeadDescription = (lead: Lead) => {
    const payload = lead.payload;
    switch (lead.useCase) {
      case 'SALES':
        return payload.problemStatement || 'No description provided';
      case 'APPT':
        return `Preferred: ${payload.preferredDate} at ${payload.preferredTime}`;
      case 'SUPPORT':
        return payload.description || 'No description provided';
      default:
        return 'No description available';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Leads Inbox</h1>
                <p className="text-gray-600 mt-1">Manage and track your AI form submissions</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleExport}
                className="btn-secondary flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-gray-500" />
            <h3 className="font-medium text-gray-900">Filters</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Use Case
              </label>
              <select
                value={filters.useCase}
                onChange={(e) => setFilters({ ...filters, useCase: e.target.value })}
                className="input-field"
                aria-label="Filter by use case"
              >
                <option value="">All Types</option>
                <option value="SALES">Sales Inquiry</option>
                <option value="APPT">Service Appointment</option>
                <option value="SUPPORT">Support Ticket</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="input-field"
                aria-label="Filter by status"
              >
                <option value="">All Statuses</option>
                <option value="NEW">New</option>
                <option value="SEEN">Seen</option>
                <option value="REPLIED">Replied</option>
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  placeholder="Search leads..."
                  className="input-field pl-10"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Leads</p>
                <p className="text-2xl font-bold text-gray-900">{pagination.total}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">New</p>
                <p className="text-2xl font-bold text-red-600">
                  {leads.filter(lead => lead.status === 'NEW').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-red-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Seen</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {leads.filter(lead => lead.status === 'SEEN').length}
                </p>
              </div>
              <Eye className="h-8 w-8 text-yellow-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Replied</p>
                <p className="text-2xl font-bold text-green-600">
                  {leads.filter(lead => lead.status === 'REPLIED').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </div>
        </div>

        {/* Leads List */}
        <div className="bg-white rounded-lg shadow-sm border">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
              <p className="text-gray-600 mt-2">Loading leads...</p>
            </div>
          ) : leads.length === 0 ? (
            <div className="p-8 text-center">
              <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No leads found</h3>
              <p className="text-gray-600">Try adjusting your filters or create some demo data.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {leads.map((lead) => {
                const UseCaseIcon = useCaseIcons[lead.useCase as keyof typeof useCaseIcons];
                const StatusIcon = statusIcons[lead.status as keyof typeof statusIcons];
                
                return (
                  <div key={lead.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className={`p-2 rounded-lg ${useCaseColors[lead.useCase as keyof typeof useCaseColors]}`}>
                          <UseCaseIcon className="h-5 w-5" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-lg font-medium text-gray-900 truncate">
                              {getLeadTitle(lead)}
                            </h3>
                            <span className={`px-2 py-1 text-xs rounded-full ${useCaseColors[lead.useCase as keyof typeof useCaseColors]}`}>
                              {lead.useCase}
                            </span>
                          </div>
                          
                          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                            {getLeadDescription(lead)}
                          </p>
                          
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>{formatDate(lead.createdAt)}</span>
                            <span>•</span>
                            <span>Source: {lead.source}</span>
                            {lead.tags.length > 0 && (
                              <>
                                <span>•</span>
                                <div className="flex space-x-1">
                                  {lead.tags.map((tag, index) => (
                                    <span key={index} className="px-1 py-0.5 bg-gray-100 text-gray-600 rounded">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className={`text-xs px-2 py-1 rounded-full border-0 ${statusColors[lead.status as keyof typeof statusColors]}`}
                          aria-label={`Change status for ${getLeadTitle(lead)}`}
                        >
                          <option value="NEW">New</option>
                          <option value="SEEN">Seen</option>
                          <option value="REPLIED">Replied</option>
                        </select>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex justify-center mt-6">
            <div className="flex space-x-2">
              <button
                onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
                disabled={pagination.page === 1}
                className="px-3 py-2 text-sm border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              
              {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setPagination({ ...pagination, page })}
                  className={`px-3 py-2 text-sm border rounded-lg ${
                    page === pagination.page
                      ? 'bg-primary-600 text-white border-primary-600'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
                disabled={pagination.page === pagination.pages}
                className="px-3 py-2 text-sm border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
